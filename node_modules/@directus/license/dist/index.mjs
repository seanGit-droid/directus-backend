import * as jose from "jose";
import { invert } from "lodash-es";
import z from "zod";
import { throwIfEmpty } from "@directus/sdk";
//#region src/constants.ts
const getLicenseApiURL = () => process.env["NODE_ENV"] === "development" && process.env["LICENSE_API_URL"] ? process.env["LICENSE_API_URL"] : "https://licensing.directus.com";
const LICENSE_API_VERSION = "2026-02-18";
const LOCAL_JWK = {
	crv: "Ed25519",
	x: "pvY3LqBAs7Cu9oG7H_PwkG7OsztDYSgPJP29RRgc8lY",
	kty: "OKP",
	kid: "9c884d23cdb155ca",
	alg: "EdDSA",
	use: "sig"
};
const CORE_LICENSE = {
	meta: {
		offline: true,
		grace_period: -1,
		name: "Core",
		version: LICENSE_API_VERSION,
		validation_interval: -1,
		expires_at: -1
	},
	entitlements: {
		seats: { limit: 3 },
		collections: { limit: 25 },
		flows: { limit: 5 },
		sso_enabled: { default: false },
		activity_historical_timeframe: { limit: 3600 * 24 * 30 },
		revision_historical_timeframe: { limit: 3600 * 24 * 30 },
		telemetry_required: { default: true },
		offline_enabled: { default: true },
		custom_llms_enabled: { default: false },
		custom_permission_rules_enabled: { default: false },
		display_powered_by: "DIRECTUS",
		production_enabled: { default: true },
		ai_translations_enabled: { default: false }
	}
};
//#endregion
//#region src/error.ts
var LicenseServerError = class LicenseServerError extends Error {
	code;
	status;
	extensions;
	constructor(opts) {
		super(opts.message);
		this.name = "LicenseServerError";
		this.code = opts.code ?? "UNKNOWN";
		this.status = opts.status ?? 500;
		this.extensions = opts.extensions ?? {};
	}
	static fromResponse(response, errors) {
		const error = errors?.[0];
		const code = error?.extensions?.code ?? "UNKNOWN";
		return new LicenseServerError({
			message: error?.message ?? "An unknown error occurred while processing the license request.",
			code,
			status: response.status ?? 500,
			extensions: error?.extensions
		});
	}
};
//#endregion
//#region src/client.ts
const DEFAULT_RETRIES = 3;
const RETRY_BACKOFF_MS = 250;
/**
* Low-level HTTP helper for the licensing API. Prefer the typed wrappers
*  where possible.
*
* Resolves with the parsed JSON body, or `null` for non-JSON responses.
* Throws an `Error` on non-2xx responses, or the parsed JSON body itself
* when the server returns `{ error: ... }`.
*/
async function request(path, options) {
	const url = new URL(path, getLicenseApiURL());
	if (options?.params) for (const [key, value] of Object.entries(options.params)) url.searchParams.set(key, String(value));
	const headers = {
		...options?.body ? { "Content-Type": "application/json" } : {},
		...options?.headers,
		"Directus-License-Version": LICENSE_API_VERSION
	};
	if (options?.auth) {
		headers["Directus-License-Key"] = options.auth.license_key;
		headers["Directus-Project-ID"] = options.auth.project_id;
		headers["Directus-Public-URL"] = options.auth.public_url;
	}
	const init = {
		method: options?.method ?? "GET",
		headers
	};
	if (options?.body) init.body = JSON.stringify(options.body);
	const maxRetries = options?.retries ?? DEFAULT_RETRIES;
	let response;
	let lastError = null;
	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		lastError = null;
		try {
			response = await fetch(url, init);
			if (response.status !== 503) break;
		} catch (err) {
			lastError = err;
			response = void 0;
		}
		if (attempt < maxRetries) await new Promise((r) => setTimeout(r, RETRY_BACKOFF_MS * 2 ** attempt));
	}
	if (!response) throw lastError;
	const result = response.headers.get("Content-Type")?.startsWith("application/json") ? await response.json() : null;
	if (!response.ok) throw LicenseServerError.fromResponse(response, result?.errors);
	return result;
}
/**
* Pre-verify a key without binding it to a project. Resolves only for
* active, unbound licenses; bound/invalid keys throw a generic error.
*/
function previewKey(body) {
	return request("/api/licenses/preview", {
		method: "POST",
		body
	});
}
/**
* Bind a key to a project_id + public_url and obtain a signed JWT. Idempotent.
* If `project_id` is already bound (e.g. cloned-database) the response includes a
* fresh `new_project_id` that should be persisted
*/
function activateKey(body) {
	return request("/api/licenses/activate", {
		method: "POST",
		body
	});
}
/**
* Daily engine check-in. Re-verifies license validity and returns a refreshed JWT.
* Reports `usage_metrics` for the current project.
*/
function refreshLicense(auth, body) {
	return request("/api/licenses/refresh", {
		method: "POST",
		body,
		auth
	});
}
/**
* Unbind a key from its project (e.g. server migrations) so it can be
* activated elsewhere.
*/
function deactivateKey(auth) {
	return request("/api/licenses/deactivate", {
		method: "POST",
		auth
	});
}
/**
* Update a key from the current to the new
*/
function updateKey(auth, body) {
	return request("/api/licenses/update", {
		method: "POST",
		body,
		auth
	});
}
/**
* Get billing portal
*/
function billingPortal(auth) {
	return request("/api/licenses/portal", {
		method: "POST",
		auth
	});
}
/**
* Get possible addons for a given key
*/
function readAddons(auth) {
	return request("/api/licenses/addons/options", {
		method: "GET",
		auth
	});
}
/**
*  Update an addon quantity for a license
*/
function updateAddonQuantity(auth, body) {
	return request("/api/licenses/addons", {
		method: "PATCH",
		body,
		auth
	});
}
/**
* Remove an addon from a license
*/
function deleteAddon(auth, body) {
	return request("/api/licenses/addons", {
		method: "DELETE",
		body: body.addon_ids,
		auth
	});
}
//#endregion
//#region src/entitlements.ts
/**
* All entitlement keys
*/
const ENTITLEMENT_KEYS = [
	"seats",
	"collections",
	"flows",
	"activity_historical_timeframe",
	"revision_historical_timeframe",
	"sso_enabled",
	"offline_enabled",
	"telemetry_required",
	"display_powered_by",
	"custom_llms_enabled",
	"custom_permission_rules_enabled",
	"production_enabled",
	"ai_translations_enabled"
];
/**
* Numeric entitlements that require a registered usage source and can be
* asserted/checked at call sites (e.g. seats, collections).
*/
const COUNTABLE_ENTITLEMENT_KEYS = [
	"seats",
	"collections",
	"flows"
];
/**
* Numeric entitlements whose limit is purely declarative.
* These are applied as a passive limit without any usage counter.
* They cannot be registered, asserted, or checked.
*/
const PASSIVE_LIMIT_ENTITLEMENT_KEYS = ["activity_historical_timeframe", "revision_historical_timeframe"];
/**
* Boolean entitlements that act as feature flags.
*/
const FEATURE_FLAG_ENTITLEMENT_KEYS = [
	"sso_enabled",
	"offline_enabled",
	"telemetry_required",
	"custom_llms_enabled",
	"custom_permission_rules_enabled"
];
/**
* Entitlements which are only handled on the app side.
*/
const APP_ENTITLEMENT_KEYS = [
	"production_enabled",
	"display_powered_by",
	"ai_translations_enabled"
];
//#endregion
//#region src/schema.ts
function createEnum(enumObject) {
	const enumReverse = invert(enumObject);
	return z.codec(z.literal(Object.values(enumObject)), z.literal(Object.values(enumReverse)), {
		decode: (value) => enumReverse[value],
		encode: (value) => enumObject[value]
	});
}
const NumericEntitlement = z.codec(z.array(z.number()).min(1).max(3), z.object({
	/** Base limit. No limit if -1 */
	limit: z.number(),
	/** Allowed amout over the limit. No overage if undefined. Infinite if -1 */
	overage: z.number().optional(),
	/** Purchased addon amount. No addons if undefined */
	addon: z.number().optional()
}), {
	decode(value) {
		return {
			limit: value[0],
			overage: value[1],
			addon: value[2]
		};
	},
	encode(value) {
		const result = [value.limit];
		if (value.overage !== void 0 || value.addon !== void 0) result.push(value.overage ?? 0);
		if (value.addon !== void 0) result.push(value.addon);
		return result;
	}
});
const BooleanEntitlement = z.codec(z.array(z.literal([0, 1])).min(1).max(2), z.object({
	/** Base value */
	default: z.boolean(),
	/** Overwrites base value, e.g. when purchasing addons */
	override: z.boolean().optional()
}), {
	decode(value) {
		return {
			default: value[0] === 1,
			override: value[1] === void 0 ? void 0 : value[1] === 1
		};
	},
	encode(value) {
		const result = [value.default ? 1 : 0];
		if (value.override !== void 0) result.push(value.override ? 1 : 0);
		return result;
	}
});
const PoweredByEntitlement = createEnum({
	HIDDEN: 0,
	OIG: 1,
	DIRECTUS: 2,
	NON_PROD: 3
});
const Entitlements = z.codec(z.object({
	s: NumericEntitlement,
	c: NumericEntitlement,
	f: NumericEntitlement,
	aht: NumericEntitlement,
	rht: NumericEntitlement,
	se: BooleanEntitlement,
	oe: BooleanEntitlement,
	tr: BooleanEntitlement,
	dpb: PoweredByEntitlement,
	cle: BooleanEntitlement,
	cpre: BooleanEntitlement,
	pe: BooleanEntitlement,
	ate: BooleanEntitlement
}), z.object({
	seats: NumericEntitlement.out,
	collections: NumericEntitlement.out,
	flows: NumericEntitlement.out,
	/** Activity log retenton (in s) */
	activity_historical_timeframe: NumericEntitlement.out,
	/** Revisions History (in s) */
	revision_historical_timeframe: NumericEntitlement.out,
	sso_enabled: BooleanEntitlement.out,
	offline_enabled: BooleanEntitlement.out,
	telemetry_required: BooleanEntitlement.out,
	display_powered_by: PoweredByEntitlement.out,
	custom_llms_enabled: BooleanEntitlement.out,
	custom_permission_rules_enabled: BooleanEntitlement.out,
	production_enabled: BooleanEntitlement.out,
	ai_translations_enabled: BooleanEntitlement.out
}), {
	decode: (value) => ({
		seats: value.s,
		collections: value.c,
		flows: value.f,
		activity_historical_timeframe: value.aht,
		revision_historical_timeframe: value.rht,
		sso_enabled: value.se,
		offline_enabled: value.oe,
		telemetry_required: value.tr,
		display_powered_by: value.dpb,
		custom_llms_enabled: value.cle,
		custom_permission_rules_enabled: value.cpre,
		production_enabled: value.pe,
		ai_translations_enabled: value.ate
	}),
	encode: (value) => ({
		s: value.seats,
		c: value.collections,
		f: value.flows,
		aht: value.activity_historical_timeframe,
		rht: value.revision_historical_timeframe,
		se: value.sso_enabled,
		oe: value.offline_enabled,
		tr: value.telemetry_required,
		dpb: value.display_powered_by,
		cle: value.custom_llms_enabled,
		cpre: value.custom_permission_rules_enabled,
		pe: value.production_enabled,
		ate: value.ai_translations_enabled
	})
});
const BooleanCodec = z.codec(z.literal([0, 1]), z.boolean(), {
	decode: (value) => Boolean(value),
	encode: (value) => value ? 1 : 0
});
const TimeDuration = z.number().refine((n) => n === -1 || n > 0, "-1 (unlimited) or positive");
const Meta = z.codec(z.object({
	n: z.string(),
	v: z.string(),
	o: BooleanCodec,
	ea: TimeDuration.nullable().optional(),
	ra: TimeDuration.nullable().optional(),
	gp: TimeDuration,
	vi: TimeDuration,
	ob: z.object({
		s: z.number().gte(0).optional(),
		c: z.number().gte(0).optional(),
		f: z.number().gte(0).optional()
	}).optional()
}), z.object({
	/** Name of license */
	name: z.string(),
	/** The JWT version */
	version: z.string(),
	/** weather this license is allowed offline */
	offline: BooleanCodec.out,
	/** when the license expires (in s, -1 = unlimited) */
	expires_at: TimeDuration.nullable().optional(),
	/** when the license should be renewed (in s, -1 = unlimited) */
	renews_at: TimeDuration.nullable().optional(),
	/** how long an expired license still keeps working (-1 = unlimited) */
	grace_period: TimeDuration,
	/** the inverval in which we refresh the jwt (in s, -1 = unlimited) */
	validation_interval: TimeDuration,
	/** when the license JWT was issued (sourced from the JWT `iat` envelope claim) */
	issued_at: z.number().optional(),
	overage_billed: z.object({
		seats: z.number().gte(0).optional(),
		collections: z.number().gte(0).optional(),
		flows: z.number().gte(0).optional()
	}).optional()
}), {
	decode: (value) => ({
		name: value.n,
		version: value.v,
		offline: value.o,
		grace_period: value.gp,
		expires_at: value.ea,
		renews_at: value.ra,
		validation_interval: value.vi,
		...value.ob ? { overage_billed: {
			seats: value.ob.s,
			collections: value.ob.c,
			flows: value.ob.f
		} } : {}
	}),
	encode: (value) => ({
		n: value.name,
		v: value.version,
		o: value.offline,
		ea: value.expires_at,
		ra: value.renews_at,
		gp: value.grace_period,
		vi: value.validation_interval,
		...value.overage_billed ? { ob: {
			s: value.overage_billed.seats,
			c: value.overage_billed.collections,
			f: value.overage_billed.flows
		} } : {}
	})
});
const License = z.codec(z.object({
	e: Entitlements,
	m: Meta,
	iat: z.number().optional()
}), z.object({
	entitlements: Entitlements.out,
	meta: Meta.out
}), {
	decode: (value) => ({
		entitlements: value.e,
		meta: {
			...value.m,
			...value.iat !== void 0 && { issued_at: value.iat }
		}
	}),
	encode: (value) => {
		const { issued_at, ...m } = value.meta;
		return {
			e: value.entitlements,
			m,
			...issued_at !== void 0 && { iat: issued_at }
		};
	}
});
const ResolveInput = z.object({
	collections: z.array(z.string()).optional(),
	seats: z.array(z.string()).optional(),
	flows: z.array(z.string()).optional(),
	sso_enabled: z.union([z.object({ admin: z.object({
		email: z.string().optional(),
		password: z.string().optional()
	}) }), z.boolean()]).optional()
});
//#endregion
//#region src/jwt.ts
const local = jose.createLocalJWKSet({ keys: [LOCAL_JWK] });
const getRemote = () => {
	return jose.createRemoteJWKSet(new URL("/.well-known/jwks.json", getLicenseApiURL()), { headers: { "Directus-License-Version": LICENSE_API_VERSION } });
};
const VERIFY_OPTIONS = {
	issuer: "directus-licensing-service",
	audience: "directus",
	algorithms: ["EdDSA"],
	requiredClaims: ["exp"]
};
/**
* Determines if a jose error is a validation error (e.g. signature) or a fetch error (e.g. timeout).
*/
function isValidationError(error) {
	if (error instanceof jose.errors.JOSEError === false) return false;
	return !(error instanceof jose.errors.JWKSTimeout || error instanceof jose.errors.JWKSInvalid || error instanceof jose.errors.JWKSNoMatchingKey || error instanceof jose.errors.JWKSMultipleMatchingKeys);
}
/**
* Verifies a license JWT and returns the parsed payload.
*
* Trust model:
* - Offline-claimed tokens are verified against the local JWK only.
* - Online tokens are verified against the remote JWKS, falling back to local on fetch failures.
*
* Verification must still happen against the local JWK to ensure the token is valid.
* This ensures expired or tampered tokens are rejected, while allowing for temporary issues when fetching the remote JWKS.
*
* @param token  the license JWT
* @returns the parsed License
* @throws {jose.errors.JOSEError} if JWT validation fails
* @throws {z.ZodError} if the verified payload does not match the License schema
*/
async function verifyLicense(token) {
	const decoded = jose.decodeJwt(token);
	const license = License.parse(decoded);
	if (license.meta.offline !== true) try {
		await jose.jwtVerify(token, getRemote(), VERIFY_OPTIONS);
		return license;
	} catch (error) {
		if (isValidationError(error)) throw error;
	}
	await jose.jwtVerify(token, local, VERIFY_OPTIONS);
	return license;
}
//#endregion
//#region src/key.ts
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const LICENSE_KEY = z.string().trim().transform((val) => {
	let cleaned = val.toUpperCase();
	cleaned = cleaned.replace(/-/g, "");
	return cleaned.replace(/O/g, "0").replace(/[IL]/g, "1");
}).superRefine((val, ctx) => {
	if (val[0] !== "D") {
		ctx.addIssue({
			code: "custom",
			message: "License key not for Directus"
		});
		return;
	}
	if (val.length !== 25) {
		ctx.addIssue({
			code: "custom",
			message: "License key must be 25 characters long"
		});
		return;
	}
	const invalidChars = val.split("").filter((c) => !ALPHABET.includes(c));
	if (invalidChars.length > 0) {
		ctx.addIssue({
			code: "custom",
			message: `Invalid characters "${invalidChars.join(",")}" in license key`
		});
		return;
	}
	const payload = val.slice(0, 24);
	if (val[24] !== luhnChecksum(payload)) ctx.addIssue({
		code: "custom",
		message: "Invalid license key checksum"
	});
}).transform((val) => val.match(/.{1,5}/g).join("-"));
function luhnChecksum(payload) {
	let sum = 0;
	for (let i = 0; i < payload.length; i++) {
		const char = payload.at(-(1 + i));
		const value = ALPHABET.indexOf(char);
		if ((i + 1) % 2 !== 0) {
			let doubled = value * 2;
			if (doubled >= 32) doubled -= 31;
			sum += doubled;
		} else sum += value;
	}
	return ALPHABET[(32 - sum % 32) % 32];
}
function normalizeLicenseKey(value) {
	const groups = value.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1").replace(new RegExp(`[^${ALPHABET}]`, "g"), "").match(/.{1,5}/g);
	if (!groups) return "";
	return groups.slice(0, 5).join("-");
}
//#endregion
//#region src/sdk.ts
/**
* Get the current license state, including entitlements and usage.
* @returns The license info payload.
*/
const readLicense = () => () => ({
	method: "GET",
	path: "/license"
});
/**
* Update a license key
*/
const updateLicense = (options) => () => ({
	method: "PATCH",
	path: "/license",
	body: JSON.stringify({ license_key: options.license_key })
});
/**
* Activate a license key
*/
const activateLicense = (options) => () => ({
	method: "POST",
	path: "/license",
	body: JSON.stringify({ license_key: options.license_key })
});
/**
*  Deactivate a license
*/
const deactivateLicense = () => () => ({
	method: "DELETE",
	path: "/license"
});
/**
* Preview a license key without applying it.
* @returns Info about license.
*/
const previewLicense = (options) => () => ({
	method: "POST",
	path: "/license/preview",
	body: JSON.stringify({ license_key: options.license_key })
});
/**
* Pending resolution for the entitlements of the current or provided license
* @returns Info about resolution
*/
const generateLicensePendingResolution = (options) => () => ({
	method: "POST",
	path: "/license/pending-resolution",
	body: JSON.stringify({ license_key: options?.license_key })
});
/**
* Apply provided resolutions to bring the instance back under its license entitlements.
*/
const applyLicenseResolution = (options) => () => ({
	method: "POST",
	path: "/license/resolve",
	body: JSON.stringify(options)
});
/**
* Read addons for the current license
*/
const readLicenseAddons = () => () => ({
	method: "GET",
	path: "/license/addons"
});
/**
* Update quantity for a given addon
*/
const updateLicenseAddon = (addonId, options) => () => {
	throwIfEmpty(addonId, "An addonId is required");
	return {
		method: "PATCH",
		path: `/license/addons/${addonId}`,
		body: JSON.stringify({ quantity: options.quantity })
	};
};
/**
* Resolve any outstanding resolution for the license entitlement
*/
const deleteLicenseAddon = (addonId) => () => {
	throwIfEmpty(addonId, "An addonId is required");
	return {
		method: "DELETE",
		path: `/license/addons/${addonId}`
	};
};
/**
* Redirects to the Stripe billing portal (302).
*/
const getLicensePortal = () => () => ({
	method: "GET",
	path: "/license/portal"
});
//#endregion
export { APP_ENTITLEMENT_KEYS, BooleanEntitlement, CORE_LICENSE, COUNTABLE_ENTITLEMENT_KEYS, ENTITLEMENT_KEYS, Entitlements, FEATURE_FLAG_ENTITLEMENT_KEYS, LICENSE_API_VERSION, LICENSE_KEY, LOCAL_JWK, License, LicenseServerError, Meta, NumericEntitlement, PASSIVE_LIMIT_ENTITLEMENT_KEYS, PoweredByEntitlement, ResolveInput, activateKey, activateLicense, applyLicenseResolution, billingPortal, deactivateKey, deactivateLicense, deleteAddon, deleteLicenseAddon, generateLicensePendingResolution, getLicenseApiURL, getLicensePortal, luhnChecksum, normalizeLicenseKey, previewKey, previewLicense, readAddons, readLicense, readLicenseAddons, refreshLicense, request, updateAddonQuantity, updateKey, updateLicense, updateLicenseAddon, verifyLicense };
