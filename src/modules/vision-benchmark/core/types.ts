export const VISION_LABELS = [
  'hardhat',
  'safety_vest',
  'gloves',
  'goggles',
  'mask',
  'ladder',
  'safety_cone',
] as const;

export type VisionLabel = (typeof VISION_LABELS)[number];

export interface VisionBenchmarkSample {
  id: string;
  imagePath: string;
  expectedLabel: VisionLabel;
  licenseVerified: boolean;
  privacyReviewed: boolean;
  sha256: string;
}

export interface VisionProviderResponse {
  rawOutput: string;
  latencyMs: number;
  success: boolean;
  errorMessage: string | null;
}

export interface VisionPredictionRecord {
  sampleId: string;
  expectedLabel: VisionLabel;
  rawOutput: string;
  normalizedLabel: VisionLabel | null;
  latencyMs: number;
  providerSuccess: boolean;
  errorCategory: string | null;
}

export interface ClassMetrics {
  label: VisionLabel;
  truePositive: number;
  falsePositive: number;
  falseNegative: number;
  precision: number;
  recall: number;
  f1: number;
  support: number;
}

export interface VisionAggregateMetrics {
  totalSamples: number;
  correctPredictions: number;
  exactMatchAccuracy: number;
  macroPrecision: number;
  macroRecall: number;
  macroF1: number;
  invalidOutputRate: number;
  successfulRequestRate: number;
  medianLatencyMs: number;
  p95LatencyMs: number;
  throughputSamplesPerSecond: number;
  perClass: ClassMetrics[];
}

export interface VisionBenchmarkThresholds {
  minimumAccuracy: number;
  minimumMacroF1: number;
  maximumInvalidOutputRate: number;
  minimumSuccessfulRequestRate: number;
}

export interface VisionBenchmarkEvidence {
  schemaVersion: '1.0.0';
  workloadId: 'construction-component-recognition-v1';
  workloadVersion: string;
  manifestVersion: string;
  manifestSha256: string;
  promptVersion: string;
  provider: string;
  model: string;
  deviceProfileId: string;
  gitCommitSha: string;
  startedAt: string;
  completedAt: string;
  records: VisionPredictionRecord[];
  metrics: VisionAggregateMetrics;
  thresholds: VisionBenchmarkThresholds;
  passed: boolean;
  limitations: string[];
}

export interface VisionBenchmarkEvaluationInput {
  workloadVersion: string;
  manifestVersion: string;
  manifestSha256: string;
  promptVersion: string;
  provider: string;
  model: string;
  deviceProfileId: string;
  gitCommitSha: string;
  startedAt: string;
  completedAt: string;
  samples: VisionBenchmarkSample[];
  responses: VisionProviderResponse[];
  thresholds?: Partial<VisionBenchmarkThresholds>;
  limitations?: string[];
}