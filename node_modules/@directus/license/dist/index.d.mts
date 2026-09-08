import { JWK } from "jose";
import z from "zod";
import { RestCommand } from "@directus/sdk";
import { Accountability } from "@directus/types";
import { Knex } from "knex";

//#region src/schema.d.ts
declare const NumericEntitlement: z.ZodCodec<z.ZodArray<z.ZodNumber>, z.ZodObject<{
  limit: z.ZodNumber;
  overage: z.ZodOptional<z.ZodNumber>;
  addon: z.ZodOptional<z.ZodNumber>;
}, z.z.core.$strip>>;
declare const BooleanEntitlement: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
  default: z.ZodBoolean;
  override: z.ZodOptional<z.ZodBoolean>;
}, z.z.core.$strip>>;
declare const PoweredByEntitlement: z.ZodCodec<z.ZodLiteral<0 | 1 | 3 | 2>, z.ZodLiteral<"HIDDEN" | "OIG" | "DIRECTUS" | "NON_PROD">>;
type PoweredByEntitlement = z.infer<typeof PoweredByEntitlement>;
declare const Entitlements: z.ZodCodec<z.ZodObject<{
  s: z.ZodCodec<z.ZodArray<z.ZodNumber>, z.ZodObject<{
    limit: z.ZodNumber;
    overage: z.ZodOptional<z.ZodNumber>;
    addon: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>>;
  c: z.ZodCodec<z.ZodArray<z.ZodNumber>, z.ZodObject<{
    limit: z.ZodNumber;
    overage: z.ZodOptional<z.ZodNumber>;
    addon: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>>;
  f: z.ZodCodec<z.ZodArray<z.ZodNumber>, z.ZodObject<{
    limit: z.ZodNumber;
    overage: z.ZodOptional<z.ZodNumber>;
    addon: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>>;
  aht: z.ZodCodec<z.ZodArray<z.ZodNumber>, z.ZodObject<{
    limit: z.ZodNumber;
    overage: z.ZodOptional<z.ZodNumber>;
    addon: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>>;
  rht: z.ZodCodec<z.ZodArray<z.ZodNumber>, z.ZodObject<{
    limit: z.ZodNumber;
    overage: z.ZodOptional<z.ZodNumber>;
    addon: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>>;
  se: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>>;
  oe: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>>;
  tr: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>>;
  dpb: z.ZodCodec<z.ZodLiteral<0 | 1 | 3 | 2>, z.ZodLiteral<"HIDDEN" | "OIG" | "DIRECTUS" | "NON_PROD">>;
  cle: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>>;
  cpre: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>>;
  pe: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>>;
  ate: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>>;
}, z.z.core.$strip>, z.ZodObject<{
  seats: z.ZodObject<{
    limit: z.ZodNumber;
    overage: z.ZodOptional<z.ZodNumber>;
    addon: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>;
  collections: z.ZodObject<{
    limit: z.ZodNumber;
    overage: z.ZodOptional<z.ZodNumber>;
    addon: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>;
  flows: z.ZodObject<{
    limit: z.ZodNumber;
    overage: z.ZodOptional<z.ZodNumber>;
    addon: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>;
  activity_historical_timeframe: z.ZodObject<{
    limit: z.ZodNumber;
    overage: z.ZodOptional<z.ZodNumber>;
    addon: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>;
  revision_historical_timeframe: z.ZodObject<{
    limit: z.ZodNumber;
    overage: z.ZodOptional<z.ZodNumber>;
    addon: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>;
  sso_enabled: z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>;
  offline_enabled: z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>;
  telemetry_required: z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>;
  display_powered_by: z.ZodLiteral<"HIDDEN" | "OIG" | "DIRECTUS" | "NON_PROD">;
  custom_llms_enabled: z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>;
  custom_permission_rules_enabled: z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>;
  production_enabled: z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>;
  ai_translations_enabled: z.ZodObject<{
    default: z.ZodBoolean;
    override: z.ZodOptional<z.ZodBoolean>;
  }, z.z.core.$strip>;
}, z.z.core.$strip>>;
type Entitlements = z.infer<typeof Entitlements>;
declare const Meta: z.ZodCodec<z.ZodObject<{
  n: z.ZodString;
  v: z.ZodString;
  o: z.ZodCodec<z.ZodLiteral<0 | 1>, z.ZodBoolean>;
  ea: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
  ra: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
  gp: z.ZodNumber;
  vi: z.ZodNumber;
  ob: z.ZodOptional<z.ZodObject<{
    s: z.ZodOptional<z.ZodNumber>;
    c: z.ZodOptional<z.ZodNumber>;
    f: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>>;
}, z.z.core.$strip>, z.ZodObject<{
  name: z.ZodString;
  version: z.ZodString;
  offline: z.ZodBoolean;
  expires_at: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
  renews_at: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
  grace_period: z.ZodNumber;
  validation_interval: z.ZodNumber;
  issued_at: z.ZodOptional<z.ZodNumber>;
  overage_billed: z.ZodOptional<z.ZodObject<{
    seats: z.ZodOptional<z.ZodNumber>;
    collections: z.ZodOptional<z.ZodNumber>;
    flows: z.ZodOptional<z.ZodNumber>;
  }, z.z.core.$strip>>;
}, z.z.core.$strip>>;
type Meta = z.infer<typeof Meta>;
declare const License: z.ZodCodec<z.ZodObject<{
  e: z.ZodCodec<z.ZodObject<{
    s: z.ZodCodec<z.ZodArray<z.ZodNumber>, z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>>;
    c: z.ZodCodec<z.ZodArray<z.ZodNumber>, z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>>;
    f: z.ZodCodec<z.ZodArray<z.ZodNumber>, z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>>;
    aht: z.ZodCodec<z.ZodArray<z.ZodNumber>, z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>>;
    rht: z.ZodCodec<z.ZodArray<z.ZodNumber>, z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>>;
    se: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>>;
    oe: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>>;
    tr: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>>;
    dpb: z.ZodCodec<z.ZodLiteral<0 | 1 | 3 | 2>, z.ZodLiteral<"HIDDEN" | "OIG" | "DIRECTUS" | "NON_PROD">>;
    cle: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>>;
    cpre: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>>;
    pe: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>>;
    ate: z.ZodCodec<z.ZodArray<z.ZodLiteral<0 | 1>>, z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>>;
  }, z.z.core.$strip>, z.ZodObject<{
    seats: z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>;
    collections: z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>;
    flows: z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>;
    activity_historical_timeframe: z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>;
    revision_historical_timeframe: z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>;
    sso_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    offline_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    telemetry_required: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    display_powered_by: z.ZodLiteral<"HIDDEN" | "OIG" | "DIRECTUS" | "NON_PROD">;
    custom_llms_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    custom_permission_rules_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    production_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    ai_translations_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
  }, z.z.core.$strip>>;
  m: z.ZodCodec<z.ZodObject<{
    n: z.ZodString;
    v: z.ZodString;
    o: z.ZodCodec<z.ZodLiteral<0 | 1>, z.ZodBoolean>;
    ea: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    ra: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    gp: z.ZodNumber;
    vi: z.ZodNumber;
    ob: z.ZodOptional<z.ZodObject<{
      s: z.ZodOptional<z.ZodNumber>;
      c: z.ZodOptional<z.ZodNumber>;
      f: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>>;
  }, z.z.core.$strip>, z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    offline: z.ZodBoolean;
    expires_at: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    renews_at: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    grace_period: z.ZodNumber;
    validation_interval: z.ZodNumber;
    issued_at: z.ZodOptional<z.ZodNumber>;
    overage_billed: z.ZodOptional<z.ZodObject<{
      seats: z.ZodOptional<z.ZodNumber>;
      collections: z.ZodOptional<z.ZodNumber>;
      flows: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>>;
  }, z.z.core.$strip>>;
  iat: z.ZodOptional<z.ZodNumber>;
}, z.z.core.$strip>, z.ZodObject<{
  entitlements: z.ZodObject<{
    seats: z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>;
    collections: z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>;
    flows: z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>;
    activity_historical_timeframe: z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>;
    revision_historical_timeframe: z.ZodObject<{
      limit: z.ZodNumber;
      overage: z.ZodOptional<z.ZodNumber>;
      addon: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>;
    sso_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    offline_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    telemetry_required: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    display_powered_by: z.ZodLiteral<"HIDDEN" | "OIG" | "DIRECTUS" | "NON_PROD">;
    custom_llms_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    custom_permission_rules_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    production_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
    ai_translations_enabled: z.ZodObject<{
      default: z.ZodBoolean;
      override: z.ZodOptional<z.ZodBoolean>;
    }, z.z.core.$strip>;
  }, z.z.core.$strip>;
  meta: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    offline: z.ZodBoolean;
    expires_at: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    renews_at: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    grace_period: z.ZodNumber;
    validation_interval: z.ZodNumber;
    issued_at: z.ZodOptional<z.ZodNumber>;
    overage_billed: z.ZodOptional<z.ZodObject<{
      seats: z.ZodOptional<z.ZodNumber>;
      collections: z.ZodOptional<z.ZodNumber>;
      flows: z.ZodOptional<z.ZodNumber>;
    }, z.z.core.$strip>>;
  }, z.z.core.$strip>;
}, z.z.core.$strip>>;
type License = z.infer<typeof License>;
declare const ResolveInput: z.ZodObject<{
  collections: z.ZodOptional<z.ZodArray<z.ZodString>>;
  seats: z.ZodOptional<z.ZodArray<z.ZodString>>;
  flows: z.ZodOptional<z.ZodArray<z.ZodString>>;
  sso_enabled: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
    admin: z.ZodObject<{
      email: z.ZodOptional<z.ZodString>;
      password: z.ZodOptional<z.ZodString>;
    }, z.z.core.$strip>;
  }, z.z.core.$strip>, z.ZodBoolean]>>;
}, z.z.core.$strip>;
type ResolveInput = z.infer<typeof ResolveInput>;
//#endregion
//#region src/entitlements.d.ts
type NumericEntitlementKey = { [K in keyof Entitlements]: Entitlements[K] extends {
  limit: number;
} ? K : never }[keyof Entitlements];
type BooleanEntitlementKey = { [K in keyof Entitlements]: Entitlements[K] extends {
  default: boolean;
} ? K : never }[keyof Entitlements];
type EnumEntitlementKey = { [K in keyof Entitlements]: Entitlements[K] extends string ? K : never }[keyof Entitlements];
type UsageCounter = (opts?: {
  knex?: Knex | undefined;
}) => number | Promise<number>;
type FeatureFlagValidator = (opts?: {
  knex?: Knex | undefined;
}) => boolean | Promise<boolean>;
type EntitlementResolver<K extends keyof ResolveInput> = (input: NonNullable<ResolveInput[K]>, ctx?: {
  accountability?: Accountability | undefined;
}) => void | Promise<void>;
interface AppEntitlements {
  production_enabled: boolean;
  display_powered_by: PoweredByEntitlement;
  ai_translations_enabled: boolean;
}
interface EntitlementCheckResult {
  allowed: boolean;
  hardLimit: number;
  usage: number;
  remaining: number | null;
}
interface FeatureFlagCheckResult {
  valid: boolean;
  entitled: boolean;
}
/**
 * All entitlement keys
 */
declare const ENTITLEMENT_KEYS: readonly ["seats", "collections", "flows", "activity_historical_timeframe", "revision_historical_timeframe", "sso_enabled", "offline_enabled", "telemetry_required", "display_powered_by", "custom_llms_enabled", "custom_permission_rules_enabled", "production_enabled", "ai_translations_enabled"];
type EntitlementKey = (typeof ENTITLEMENT_KEYS)[number];
/**
 * Numeric entitlements that require a registered usage source and can be
 * asserted/checked at call sites (e.g. seats, collections).
 */
declare const COUNTABLE_ENTITLEMENT_KEYS: readonly ["seats", "collections", "flows"];
type CountableEntitlementKey = (typeof COUNTABLE_ENTITLEMENT_KEYS)[number];
/**
 * Numeric entitlements whose limit is purely declarative.
 * These are applied as a passive limit without any usage counter.
 * They cannot be registered, asserted, or checked.
 */
declare const PASSIVE_LIMIT_ENTITLEMENT_KEYS: readonly ["activity_historical_timeframe", "revision_historical_timeframe"];
type PassiveLimitEntitlementKey = (typeof PASSIVE_LIMIT_ENTITLEMENT_KEYS)[number];
/**
 * Boolean entitlements that act as feature flags.
 */
declare const FEATURE_FLAG_ENTITLEMENT_KEYS: readonly ["sso_enabled", "offline_enabled", "telemetry_required", "custom_llms_enabled", "custom_permission_rules_enabled"];
type FeatureFlagEntitlementKey = (typeof FEATURE_FLAG_ENTITLEMENT_KEYS)[number];
/**
 * Entitlements which are only handled on the app side.
 */
declare const APP_ENTITLEMENT_KEYS: readonly ["production_enabled", "display_powered_by", "ai_translations_enabled"];
type AppEntitlementKey = (typeof APP_ENTITLEMENT_KEYS)[number];
//#endregion
//#region src/types.d.ts
type LicenseEditable = boolean;
type LicenseSource = 'env' | 'settings' | null;
type LicenseStatus = 'active' | 'grace' | 'locked';
type InvalidLicenseStatus = 'expired' | 'suspended' | 'canceled';
type LicensePendingResolutionKey = CountableEntitlementKey | FeatureFlagEntitlementKey;
interface LicensePendingResolutionBase {
  key: LicensePendingResolutionKey;
  kind: 'limit' | 'feature_gate';
}
interface LicensePendingResolutionLimit<TKey extends CountableEntitlementKey, TCandidate> extends LicensePendingResolutionBase {
  kind: 'limit';
  key: TKey;
  limit: number;
  usage: number;
  candidates: TCandidate[];
}
interface LicensePendingResolutionFeatureGate<TKey extends FeatureFlagEntitlementKey, TBlocker = never> extends LicensePendingResolutionBase {
  kind: 'feature_gate';
  key: TKey;
  blockers?: TBlocker;
}
type LicensePendingResolutionLimitSeats = LicensePendingResolutionLimit<'seats', {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar: string | null;
  admin?: boolean | undefined;
  email: string | null;
}>;
type LicensePendingResolutionLimitCollections = LicensePendingResolutionLimit<'collections', string>;
type LicensePendingResolutionLimitFlows = LicensePendingResolutionLimit<'flows', {
  id: string;
  name: string;
}>;
type LicensePendingResolutionFeatureGateSSO = LicensePendingResolutionFeatureGate<'sso_enabled', ('ADMIN_MISSING_EMAIL' | 'ADMIN_MISSING_PASSWORD')[]>;
type LicensePendingResolutionFeatureGateCustomLLMs = LicensePendingResolutionFeatureGate<'custom_llms_enabled'>;
type LicensePendingResolutionFeatureGateCustomPermissionRules = LicensePendingResolutionFeatureGate<'custom_permission_rules_enabled'>;
type LicensePendingResolution = LicensePendingResolutionLimitCollections | LicensePendingResolutionLimitSeats | LicensePendingResolutionLimitFlows | LicensePendingResolutionFeatureGateSSO | LicensePendingResolutionFeatureGateCustomLLMs | LicensePendingResolutionFeatureGateCustomPermissionRules;
type LicenseAddon = {
  id: string;
  name: string;
  description: string;
  icon: string;
  billing_interval: string;
  upgrade_required: boolean;
  pricing_summary: string;
  unit_price: number;
  min_quantity: number;
  scheduled_quantity: number;
  max_quantity: number;
  active_quantity: number;
};
type UsageMetrics = Record<CountableEntitlementKey, number>;
//#endregion
//#region src/client.d.ts
type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  params?: Record<string, any>;
  headers?: Record<string, string>;
  auth?: LicenseAuth;
  body?: unknown; /** Retry attempts on network errors / 503. */
  retries?: number;
};
type LicenseAuth = {
  license_key: string;
  project_id: string;
  public_url: string;
};
type PreviewKeyInput = {
  license_key: string;
};
type PreviewKeyOutput = {
  plan_name: string;
  expires_at?: number;
  renews_at?: number;
  entitlements: Entitlements;
};
type ActivateKeyInput = {
  license_key: string;
  project_id: string;
  public_url: string;
};
type ActivateKeyOutput = {
  token: string;
  new_project_id?: string;
};
type RefreshLicenseInput = {
  usage_metrics: UsageMetrics;
};
type RefreshLicenseOutput = {
  token: string;
};
type UpdateKeyInput = {
  license_key: string;
};
type UpdateKeyOutput = {
  token: string;
};
type BillingPortalOutput = {
  url: string;
};
type ReadAddonsOutput = {
  available_addons: LicenseAddon[];
};
type UpdateAddonQuantityInput = {
  addons: {
    addon_id: string;
    quantity: number;
  }[];
  usage_metrics: UsageMetrics;
};
type UpdateAddonQuantityOutput = {
  token: string;
};
type DeleteAddonInput = {
  addon_ids: string[];
};
type DeleteAddonOutput = void;
/**
 * Low-level HTTP helper for the licensing API. Prefer the typed wrappers
 *  where possible.
 *
 * Resolves with the parsed JSON body, or `null` for non-JSON responses.
 * Throws an `Error` on non-2xx responses, or the parsed JSON body itself
 * when the server returns `{ error: ... }`.
 */
declare function request(path: string, options?: RequestOptions): Promise<any>;
/**
 * Pre-verify a key without binding it to a project. Resolves only for
 * active, unbound licenses; bound/invalid keys throw a generic error.
 */
declare function previewKey(body: PreviewKeyInput): Promise<PreviewKeyOutput>;
/**
 * Bind a key to a project_id + public_url and obtain a signed JWT. Idempotent.
 * If `project_id` is already bound (e.g. cloned-database) the response includes a
 * fresh `new_project_id` that should be persisted
 */
declare function activateKey(body: ActivateKeyInput): Promise<ActivateKeyOutput>;
/**
 * Daily engine check-in. Re-verifies license validity and returns a refreshed JWT.
 * Reports `usage_metrics` for the current project.
 */
declare function refreshLicense(auth: LicenseAuth, body: RefreshLicenseInput): Promise<RefreshLicenseOutput>;
/**
 * Unbind a key from its project (e.g. server migrations) so it can be
 * activated elsewhere.
 */
declare function deactivateKey(auth: LicenseAuth): Promise<void>;
/**
 * Update a key from the current to the new
 */
declare function updateKey(auth: LicenseAuth, body: UpdateKeyInput): Promise<UpdateKeyOutput>;
/**
 * Get billing portal
 */
declare function billingPortal(auth: LicenseAuth): Promise<BillingPortalOutput>;
/**
 * Get possible addons for a given key
 */
declare function readAddons(auth: LicenseAuth): Promise<ReadAddonsOutput>;
/**
 *  Update an addon quantity for a license
 */
declare function updateAddonQuantity(auth: LicenseAuth, body: UpdateAddonQuantityInput): Promise<UpdateAddonQuantityOutput>;
/**
 * Remove an addon from a license
 */
declare function deleteAddon(auth: LicenseAuth, body: DeleteAddonInput): Promise<DeleteAddonOutput>;
//#endregion
//#region src/error.d.ts
type LicenseServerErrorPayload = {
  message?: string;
  extensions?: {
    code?: string;
  } & Record<string, unknown>;
};
declare class LicenseServerError extends Error {
  readonly code: string;
  readonly status: number;
  readonly extensions: Record<string, unknown>;
  constructor(opts: {
    message: string;
    code?: string;
    status?: number;
    extensions?: Record<string, unknown> | undefined;
  });
  static fromResponse(response: Response, errors?: LicenseServerErrorPayload[]): LicenseServerError;
}
//#endregion
//#region src/jwt.d.ts
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
declare function verifyLicense(token: string): Promise<License>;
//#endregion
//#region src/key.d.ts
declare const LICENSE_KEY: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodTransform<string, string>>;
declare function luhnChecksum(payload: string): string;
declare function normalizeLicenseKey(value: string): string;
//#endregion
//#region src/constants.d.ts
declare const getLicenseApiURL: () => string;
declare const LICENSE_API_VERSION = "2026-02-18";
declare const LOCAL_JWK: JWK;
declare const CORE_LICENSE: License;
//#endregion
//#region src/sdk.d.ts
type ReadLicenseOutput = {
  status: LicenseStatus;
  editable: LicenseEditable;
  source: LicenseSource;
  entitlements: Entitlements;
  usage: UsageMetrics;
  downgrade_reason: InvalidLicenseStatus | null;
} & Pick<Meta, 'name' | 'expires_at' | 'renews_at' | 'offline' | 'grace_period'>;
type LicenseActivateInput = {
  license_key: string;
};
type LicenseActivateOutput = void;
type LicenseDeactivateOutput = void;
type LicenseUpdateInput = {
  license_key: string;
};
type LicenseUpdateOutput = void;
type LicensePreviewInput = {
  license_key: string;
};
type LicensePreviewOutput = {
  plan_name: string;
  expires_at?: number | undefined;
  renews_at?: number | undefined;
  production_enabled: boolean;
};
type LicensePendingResolutionInput = {
  license_key?: string | null;
};
type LicensePendingResolutionOutput = LicensePendingResolution[];
type ApplyLicenseResolutionInput = ResolveInput;
type ApplyLicenseResolutionOutput = void;
type LicenseAddonsOutput = Pick<LicenseAddon, 'id' | 'name' | 'description' | 'icon' | 'upgrade_required' | 'pricing_summary' | 'min_quantity' | 'max_quantity' | 'active_quantity' | 'scheduled_quantity' | 'unit_price' | 'billing_interval'>[];
type UpdateLicenseAddonInput = {
  quantity: number;
};
type UpdateLicenseAddonOutput = void;
/**
 * Get the current license state, including entitlements and usage.
 * @returns The license info payload.
 */
declare const readLicense: <Schema>() => RestCommand<ReadLicenseOutput, Schema>;
/**
 * Update a license key
 */
declare const updateLicense: <Schema>(options: LicenseUpdateInput) => RestCommand<LicenseUpdateOutput, Schema>;
/**
 * Activate a license key
 */
declare const activateLicense: <Schema>(options: LicenseActivateInput) => RestCommand<LicenseActivateOutput, Schema>;
/**
 *  Deactivate a license
 */
declare const deactivateLicense: <Schema>() => RestCommand<LicenseDeactivateOutput, Schema>;
/**
 * Preview a license key without applying it.
 * @returns Info about license.
 */
declare const previewLicense: <Schema>(options: LicensePreviewInput) => RestCommand<LicensePreviewOutput, Schema>;
/**
 * Pending resolution for the entitlements of the current or provided license
 * @returns Info about resolution
 */
declare const generateLicensePendingResolution: <Schema>(options?: LicensePendingResolutionInput) => RestCommand<LicensePendingResolutionOutput, Schema>;
/**
 * Apply provided resolutions to bring the instance back under its license entitlements.
 */
declare const applyLicenseResolution: <Schema>(options: ApplyLicenseResolutionInput) => RestCommand<ApplyLicenseResolutionOutput, Schema>;
/**
 * Read addons for the current license
 */
declare const readLicenseAddons: <Schema>() => RestCommand<LicenseAddonsOutput, Schema>;
/**
 * Update quantity for a given addon
 */
declare const updateLicenseAddon: <Schema>(addonId: string, options: UpdateLicenseAddonInput) => RestCommand<UpdateLicenseAddonOutput, Schema>;
/**
 * Resolve any outstanding resolution for the license entitlement
 */
declare const deleteLicenseAddon: <Schema>(addonId: string) => RestCommand<void, Schema>;
/**
 * Redirects to the Stripe billing portal (302).
 */
declare const getLicensePortal: <Schema>() => RestCommand<void, Schema>;
//#endregion
export { APP_ENTITLEMENT_KEYS, ActivateKeyInput, ActivateKeyOutput, AppEntitlementKey, AppEntitlements, ApplyLicenseResolutionInput, ApplyLicenseResolutionOutput, BillingPortalOutput, BooleanEntitlement, BooleanEntitlementKey, CORE_LICENSE, COUNTABLE_ENTITLEMENT_KEYS, CountableEntitlementKey, DeleteAddonInput, DeleteAddonOutput, ENTITLEMENT_KEYS, EntitlementCheckResult, EntitlementKey, EntitlementResolver, Entitlements, EnumEntitlementKey, FEATURE_FLAG_ENTITLEMENT_KEYS, FeatureFlagCheckResult, FeatureFlagEntitlementKey, FeatureFlagValidator, InvalidLicenseStatus, LICENSE_API_VERSION, LICENSE_KEY, LOCAL_JWK, License, LicenseActivateInput, LicenseActivateOutput, LicenseAddon, LicenseAddonsOutput, LicenseAuth, LicenseDeactivateOutput, LicenseEditable, LicensePendingResolution, LicensePendingResolutionBase, LicensePendingResolutionFeatureGate, LicensePendingResolutionFeatureGateCustomLLMs, LicensePendingResolutionFeatureGateCustomPermissionRules, LicensePendingResolutionFeatureGateSSO, LicensePendingResolutionInput, LicensePendingResolutionKey, LicensePendingResolutionLimit, LicensePendingResolutionLimitCollections, LicensePendingResolutionLimitFlows, LicensePendingResolutionLimitSeats, LicensePendingResolutionOutput, LicensePreviewInput, LicensePreviewOutput, LicenseServerError, LicenseServerErrorPayload, LicenseSource, LicenseStatus, LicenseUpdateInput, LicenseUpdateOutput, Meta, NumericEntitlement, NumericEntitlementKey, PASSIVE_LIMIT_ENTITLEMENT_KEYS, PassiveLimitEntitlementKey, PoweredByEntitlement, PreviewKeyInput, PreviewKeyOutput, ReadAddonsOutput, ReadLicenseOutput, RefreshLicenseInput, RefreshLicenseOutput, RequestOptions, ResolveInput, UpdateAddonQuantityInput, UpdateAddonQuantityOutput, UpdateKeyInput, UpdateKeyOutput, UpdateLicenseAddonInput, UpdateLicenseAddonOutput, UsageCounter, UsageMetrics, activateKey, activateLicense, applyLicenseResolution, billingPortal, deactivateKey, deactivateLicense, deleteAddon, deleteLicenseAddon, generateLicensePendingResolution, getLicenseApiURL, getLicensePortal, luhnChecksum, normalizeLicenseKey, previewKey, previewLicense, readAddons, readLicense, readLicenseAddons, refreshLicense, request, updateAddonQuantity, updateKey, updateLicense, updateLicenseAddon, verifyLicense };