import { getTrustValue } from "./get-ip-from-req.js";
import { useEnv } from "@directus/env";

//#region src/utils/get-host-from-req.ts
/**
* Resolve the host (including port) the client connected to.
*
* Mirrors Express' `req.hostname` resolution: the `X-Forwarded-Host` header is
* only honored when the immediate peer is a trusted proxy (per `IP_TRUST_PROXY`),
* otherwise the `Host` header is used. Unlike `req.hostname`, the port is kept so
* the value can be compared against a URL origin.
*/
function getHostFromReq(req) {
	const trust = getTrustValue(useEnv()["IP_TRUST_PROXY"]);
	let forwarded = req.headers["x-forwarded-host"];
	if (Array.isArray(forwarded)) forwarded = forwarded[0];
	const remoteAddress = req.socket.remoteAddress ?? "";
	let host;
	if (forwarded && remoteAddress && trust(remoteAddress, 0)) {
		const commaIndex = forwarded.indexOf(",");
		host = commaIndex === -1 ? forwarded : forwarded.substring(0, commaIndex).trimEnd();
	} else host = req.headers["host"];
	return host || void 0;
}

//#endregion
export { getHostFromReq };