import { Reporter, Vitest, TestModule } from 'vitest/node';

interface BraintrustVitestEvalsReporterOptions {
    projectName?: string;
    projectId?: string;
    experimentName?: string;
    displaySummary?: boolean;
    metadata?: Record<string, unknown>;
    tags?: string[];
    baseExperiment?: string;
    baseExperimentId?: string;
}
declare class BraintrustVitestEvalsReporter implements Reporter {
    private readonly options;
    private experiment?;
    constructor(options?: BraintrustVitestEvalsReporterOptions);
    onInit(_vitest: Vitest): void;
    onTestRunEnd(testModules: ReadonlyArray<TestModule>): Promise<void>;
    private getOrCreateExperiment;
}

export { BraintrustVitestEvalsReporter as default };
