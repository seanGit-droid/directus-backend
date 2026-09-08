import { toDimension } from "../../assets/assert-transforms-allowed.js";
import { useEnv } from "@directus/env";
import sharp from "sharp";

//#region src/services/files/lib/get-sharp-instance.ts
function getSharpInstance() {
	const env = useEnv();
	const maxInputDimension = toDimension(env["ASSETS_TRANSFORM_IMAGE_MAX_DIMENSION"]) ?? 6e3;
	return sharp({
		limitInputPixels: Math.trunc(Math.pow(maxInputDimension, 2)),
		sequentialRead: true,
		failOn: env["ASSETS_INVALID_IMAGE_SENSITIVITY_LEVEL"]
	});
}

//#endregion
export { getSharpInstance };