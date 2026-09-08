import { WebpackPluginInstance } from 'unplugin';
import { B as BundlerPluginOptions } from '../plugin-B-aZh7EP.js';
export { I as InstrumentationConfig } from '../types-C1fVeiCp.js';

declare function braintrustWebpackPlugin(options?: BundlerPluginOptions): WebpackPluginInstance;
type WebpackPluginOptions = BundlerPluginOptions;
/**
 * @deprecated Use {@link braintrustWebpackPlugin} instead.
 */
declare const webpackPlugin: (options: BundlerPluginOptions) => WebpackPluginInstance;

export { type WebpackPluginOptions, braintrustWebpackPlugin, webpackPlugin };
