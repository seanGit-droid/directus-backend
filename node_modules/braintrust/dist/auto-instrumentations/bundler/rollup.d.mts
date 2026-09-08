import { RollupPlugin } from 'unplugin';
import { B as BundlerPluginOptions } from '../plugin-Bnj4E_6B.mjs';
export { I as InstrumentationConfig } from '../types-C1fVeiCp.mjs';

declare function braintrustRollupPlugin(options?: BundlerPluginOptions): RollupPlugin | RollupPlugin[];
type RollupPluginOptions = BundlerPluginOptions;
/**
 * @deprecated Use {@link braintrustRollupPlugin} instead.
 */
declare const rollupPlugin: (options: BundlerPluginOptions) => RollupPlugin<any> | RollupPlugin<any>[];

export { type RollupPluginOptions, braintrustRollupPlugin, rollupPlugin };
