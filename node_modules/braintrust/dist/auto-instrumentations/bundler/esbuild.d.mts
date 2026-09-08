import { EsbuildPlugin } from 'unplugin';
import { B as BundlerPluginOptions } from '../plugin-Bnj4E_6B.mjs';
export { I as InstrumentationConfig } from '../types-C1fVeiCp.mjs';

declare function braintrustEsbuildPlugin(options?: BundlerPluginOptions): EsbuildPlugin;
type EsbuildPluginOptions = BundlerPluginOptions;
/**
 * @deprecated Use {@link braintrustEsbuildPlugin} instead.
 */
declare const esbuildPlugin: (options: BundlerPluginOptions) => EsbuildPlugin;

export { type EsbuildPluginOptions, braintrustEsbuildPlugin, esbuildPlugin };
