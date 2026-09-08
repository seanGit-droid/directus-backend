import { toPath } from "lodash-es";

//#region src/database/helpers/fn/json/convert-json-path.ts
/**
* Build a JSON path string in dot notation (`$.a.b[0]`) shared by the dialects that
* accept it: SQLite (`json_extract`), MySQL/MariaDB (`JSON_EXTRACT`), MSSQL
* (`JSON_VALUE`/`JSON_QUERY`), and Oracle (`JSON_VALUE`/`JSON_QUERY`).
*
* @example ".color" → "$.color"
* @example ".items[0].name" → "$.items[0].name"
* @example ".author." → "$.author"
* @example "a[.b]" → "$.a.b"
*/
function convertToJsonPath(path) {
	const parts = toPath(path);
	let result = "$";
	for (const part of parts) {
		if (part === "") continue;
		const num = Number(part);
		if (Number.isInteger(num) && num >= 0 && String(num) === part) result += `[${part}]`;
		else result += `.${part}`;
	}
	return result;
}

//#endregion
export { convertToJsonPath };