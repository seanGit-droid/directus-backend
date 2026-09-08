import "./shared/binding-CCkTRaSB.cjs";
import { ConfigExport, defineConfig } from "./shared/define-config-BzVT47Bj.cjs";

//#region src/utils/load-config.d.ts
declare function loadConfig(configPath: string): Promise<ConfigExport>;
//#endregion
//#region src/config.d.ts
declare const VERSION: string;
//#endregion
export { VERSION, defineConfig, loadConfig };