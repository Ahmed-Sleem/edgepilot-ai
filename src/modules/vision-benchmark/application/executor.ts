import { evaluateVisionBenchmark } from './evaluator';
import { VisionProvider } from './provider';
import {
  VisionBenchmarkEvidence,
  VisionBenchmarkSample,
  VisionBenchmarkThresholds,
  VisionProviderResponse,
} from '../core/types';

export interface VisionBenchmarkClock {
  nowIso(): string;
  nowMilliseconds(): number;
}

export interface ExecuteVisionBenchmarkInput {
  provider: VisionProvider;
  samples: VisionBenchmarkSample[];
  workloadVersion: string;
  manifestVersion: string;
  manifestSha256: string;
  promptVersion: string;
  prompt: string;
  deviceProfileId: string;
  gitCommitSha: string;
  thresholds?: Partial<VisionBenchmarkThresholds>;
  limitations?: string[];
  clock?: VisionBenchmarkClock;
}

const systemClock: VisionBenchmarkClock = {
  nowIso(): string {
    return new Date().toISOString();
  },

  nowMilliseconds(): number {
    return Date.now();
  },
};

function normalizeLatency(
  startMilliseconds: number,
  endMilliseconds: number
): number {
  const latency = endMilliseconds - startMilliseconds;

  if (!Number.isFinite(latency) || latency < 0) {
    return 0;
  }

  return latency;
}

async function classifySample(
  provider: VisionProvider,
  sample: VisionBenchmarkSample,
  prompt: string,
  clock: VisionBenchmarkClock
): Promise<VisionProviderResponse> {
  const startedAt = clock.nowMilliseconds();

  try {
    const response = await provider.classify({
      sample,
      prompt,
    });

    const measuredLatency = normalizeLatency(
      startedAt,
      clock.nowMilliseconds()
    );

    if (
      !Number.isFinite(response.latencyMs) ||
      response.latencyMs < 0
    ) {
      return {
        ...response,
        latencyMs: measuredLatency,
      };
    }

    return response;
  } catch (error) {
    return {
      rawOutput: '',
      latencyMs: normalizeLatency(
        startedAt,
        clock.nowMilliseconds()
      ),
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : 'Unknown provider error',
    };
  }
}

export async function executeVisionBenchmark(
  input: ExecuteVisionBenchmarkInput
): Promise<VisionBenchmarkEvidence> {
  if (input.prompt.trim().length === 0) {
    throw new Error('The vision benchmark prompt cannot be empty.');
  }

  const clock = input.clock ?? systemClock;
  const startedAt = clock.nowIso();
  const responses: VisionProviderResponse[] = [];

  for (const sample of input.samples) {
    responses.push(
      await classifySample(
        input.provider,
        sample,
        input.prompt,
        clock
      )
    );
  }

  const completedAt = clock.nowIso();

  return evaluateVisionBenchmark({
    workloadVersion: input.workloadVersion,
    manifestVersion: input.manifestVersion,
    manifestSha256: input.manifestSha256,
    promptVersion: input.promptVersion,
    provider: input.provider.providerName,
    model: input.provider.modelName,
    deviceProfileId: input.deviceProfileId,
    gitCommitSha: input.gitCommitSha,
    startedAt,
    completedAt,
    samples: input.samples,
    responses,
    thresholds: input.thresholds,
    limitations: [
      ...(input.limitations ?? []),
      `Provider execution mode: ${input.provider.kind}.`,
    ],
  });
}