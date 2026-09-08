const require_src = require('./shared/src-D5CeiA1y.cjs');
require('./shared/parse-ast-index-CKLoWOY8.cjs');
require('./shared/misc-DksvspN4.cjs');
const require_load_config = require('./shared/load-config-BpWL-vMP.cjs');

//#region src/config.ts
const VERSION = require_src.version;

//#endregion
exports.VERSION = VERSION;
exports.defineConfig = require_src.defineConfig;
exports.loadConfig = require_load_config.loadConfig;