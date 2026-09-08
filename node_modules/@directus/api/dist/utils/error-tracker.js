import { useEnv } from "@directus/env";
import { ErrorCode, createError } from "@directus/errors";

//#region src/utils/error-tracker.ts
const MAX_IMPORT_ERRORS = useEnv()["MAX_IMPORT_ERRORS"];
function createErrorTracker() {
	let genericError;
	const fieldErrors = /* @__PURE__ */ new Map();
	let capturedErrorCount = 0;
	let isLimitReached = false;
	function convertToRanges(rows, minRangeSize = 4) {
		const sorted = Array.from(new Set(rows)).sort((a, b) => a - b);
		const result = [];
		if (sorted.length === 0) return [];
		let start = sorted[0];
		let prev = sorted[0];
		let count = 1;
		const nonConsecutive = [];
		const flush = () => {
			if (count >= minRangeSize) result.push({
				type: "range",
				start,
				end: prev
			});
			else for (let i = start; i <= prev; i++) nonConsecutive.push(i);
		};
		for (let i = 1; i < sorted.length; i++) {
			const current = sorted[i];
			if (current === prev + 1) {
				prev = current;
				count++;
			} else {
				flush();
				start = prev = current;
				count = 1;
			}
		}
		flush();
		if (nonConsecutive.length > 0) result.push({
			type: "lines",
			rows: nonConsecutive
		});
		return result;
	}
	function addCapturedError(err, rowNumber) {
		const field = err.extensions?.field;
		if (field) {
			const type = err.extensions?.type;
			const substring = err.extensions?.substring;
			const valid = err.extensions?.valid;
			const invalid = err.extensions?.invalid;
			let key = type ? `${field}|${type}` : field;
			if (substring !== void 0) key += `|substring:${substring}`;
			if (valid !== void 0) key += `|valid:${JSON.stringify(valid)}`;
			if (invalid !== void 0) key += `|invalid:${JSON.stringify(invalid)}`;
			if (!fieldErrors.has(err.code)) fieldErrors.set(err.code, /* @__PURE__ */ new Map());
			const errorsByCode = fieldErrors.get(err.code);
			if (!errorsByCode.has(key)) errorsByCode.set(key, {
				message: err.message,
				rowNumbers: []
			});
			errorsByCode.get(key).rowNumbers.push(rowNumber);
		} else genericError = err;
		capturedErrorCount++;
		if (capturedErrorCount >= MAX_IMPORT_ERRORS) isLimitReached = true;
	}
	function hasGenericError() {
		return genericError !== void 0;
	}
	function buildFinalErrors() {
		if (genericError) return [genericError];
		return Array.from(fieldErrors.entries()).flatMap(([code, fieldMap]) => Array.from(fieldMap.entries()).map(([compositeKey, errorData]) => {
			const parts = compositeKey.split("|");
			const field = parts[0];
			const type = parts[1];
			const extensions = {};
			for (let i = 2; i < parts.length; i++) {
				const [paramType, paramValue] = parts[i]?.split(":", 2) ?? [];
				if (!paramType || paramValue === void 0) continue;
				try {
					extensions[paramType] = JSON.parse(paramValue);
				} catch {
					extensions[paramType] = paramValue;
				}
			}
			return new (createError(code, errorData.message, 400))({
				field,
				type,
				...extensions,
				rows: convertToRanges(errorData.rowNumbers)
			});
		}));
	}
	return {
		addCapturedError,
		buildFinalErrors,
		getCount: () => capturedErrorCount,
		hasErrors: () => capturedErrorCount > 0 || hasGenericError(),
		shouldStop: () => isLimitReached || hasGenericError(),
		hasGenericError
	};
}

//#endregion
export { createErrorTracker };