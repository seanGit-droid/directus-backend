import { A as CopyEntry, C as OutExtensionObject, D as TsdownHooks, E as RolldownContext, M as CopyOptionsFn, N as AttwOptions, O as ExportsOptions, S as OutExtensionFactory, T as BuildContext, _ as globalLogger, a as NormalizedUserConfig, b as ChunkAddonObject, c as ResolvedOptions, d as UserConfig, f as UserConfigFn, g as Logger, i as NormalizedFormat, j as CopyOptions, k as TsdownChunks, l as Sourcemap, m as ReportOptions, n as Format, o as Options, p as Workspace, r as NoExternalFn, s as PublintOptions, t as DtsOptions, u as UnusedOptions, v as ChunkAddon, w as PackageType, x as OutExtensionContext, y as ChunkAddonFunction } from "./types-BquFAfMw.mjs";
import { t as defineConfig } from "./config-CqBC_jjD.mjs";

//#region src/index.d.ts

/**
* Build with tsdown.
*/
declare function build(userOptions?: Options): Promise<void>;
/** @internal */
declare const shimFile: string;
/**
* Build a single configuration, without watch and shortcuts features.
*
* Internal API, not for public use
*
* @private
* @param config Resolved options
*/
declare function buildSingle(config: ResolvedOptions, clean: () => Promise<void>): Promise<(() => Promise<void>) | undefined>;
//#endregion
export { AttwOptions, BuildContext, ChunkAddon, ChunkAddonFunction, ChunkAddonObject, CopyEntry, CopyOptions, CopyOptionsFn, DtsOptions, ExportsOptions, Format, type Logger, NoExternalFn, NormalizedFormat, NormalizedUserConfig, type Options, OutExtensionContext, OutExtensionFactory, OutExtensionObject, PackageType, PublintOptions, ReportOptions, type ResolvedOptions, RolldownContext, Sourcemap, TsdownChunks, TsdownHooks, UnusedOptions, type UserConfig, type UserConfigFn, Workspace, build, buildSingle, defineConfig, globalLogger, shimFile };