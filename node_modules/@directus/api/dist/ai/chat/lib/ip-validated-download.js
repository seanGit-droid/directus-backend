import { getAxios } from "../../../request/index.js";

//#region src/ai/chat/lib/ip-validated-download.ts
/**
* AI SDK download function that routes asset downloads through Directus's
* IP-validated HTTP agent
*/
const ipValidatedDownload = async (requestedDownloads) => {
	const axios = await getAxios();
	return Promise.all(requestedDownloads.map(async ({ url, isUrlSupportedByModel }) => {
		if (isUrlSupportedByModel) return null;
		if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error(`Unsupported URL protocol for asset download: "${url.protocol}"`);
		const response = await axios.get(url.toString(), { responseType: "arraybuffer" });
		const contentType = response.headers["content-type"];
		const mediaType = typeof contentType === "string" ? contentType.split(";")[0]?.trim() : void 0;
		return {
			data: new Uint8Array(response.data),
			mediaType: mediaType || void 0
		};
	}));
};

//#endregion
export { ipValidatedDownload };