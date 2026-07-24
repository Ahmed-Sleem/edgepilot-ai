import {
  VisionBenchmarkSample,
  VisionProviderResponse,
} from '../core/types';

export type VisionProviderKind = 'local' | 'cloud';

export interface VisionProviderRequest {
  sample: VisionBenchmarkSample;
  prompt: string;
}

export interface VisionProvider {
  readonly providerName: string;
  readonly modelName: string;
  readonly kind: VisionProviderKind;

  classify(
    request: VisionProviderRequest
  ): Promise<VisionProviderResponse>;
}