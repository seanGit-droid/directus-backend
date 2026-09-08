import { I as InstrumentationConfig } from './types-C1fVeiCp.js';

interface BundlerPluginOptions {
    /**
     * Additional instrumentation configs to apply
     */
    instrumentations?: InstrumentationConfig[];
    /**
     * Whether the transformed source will run in a browser or edge-like
     * environment.
     *
     * Global instrumentation hooks are runtime-independent. This option only
     * prevents the Node-specific Mastra source patch from entering the bundle.
     *
     * @default false
     */
    browser?: boolean;
    /**
     * Marks transformed source as targeting a browser or edge-like environment.
     *
     * This retains the previous browser-target behavior of the option. Global
     * instrumentation hooks are runtime-independent, so no diagnostics-channel
     * compatibility shim is injected.
     *
     * @deprecated Use `browser` instead.
     */
    useDiagnosticChannelCompatShim?: boolean;
}

export type { BundlerPluginOptions as B };
