import { EsbuildPlugin } from 'unplugin';
import { B as BundlerPluginOptions } from '../plugin-B-aZh7EP.js';
export { I as InstrumentationConfig } from '../types-C1fVeiCp.js';

declare function braintrustEsbuildPlugin(options?: BundlerPluginOptions): EsbuildPlugin;
type EsbuildPluginOptions = BundlerPluginOptions;
/**
 * @deprecated Use {@link braintrustEsbuildPlugin} instead.
 */
declare const esbuildPlugin: (options: BundlerPluginOptions) => EsbuildPlugin;

export { type EsbuildPluginOptions, braintrustEsbuildPlugin, esbuildPlugin };
