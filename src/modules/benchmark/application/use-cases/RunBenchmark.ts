import { BenchmarkRepository } from '../../core/ports/BenchmarkRepository';
import { AIProvider } from '../../core/ports/AIProvider';
import { ReadinessCalculator } from '../../core/services/ReadinessCalculator';
import { BenchmarkRequest } from '../../../../shared/types/benchmark';

export class RunBenchmark {
  constructor(
    private benchmarkRepository: BenchmarkRepository,
    private aiProvider: AIProvider,
    private readinessCalculator: ReadinessCalculator
  ) {}
  
  async execute(request: BenchmarkRequest, userId: string) {
    // 1. Create benchmark record
    const benchmark = await this.benchmarkRepository.create({
      workloadId: request.workload_id,
      deviceId: request.device_id,
      providerId: request.provider,
      model: request.model,
      prompt: request.prompt,
      iterations: request.iterations,
      status: 'running',
      userId,
    });
    
    try {
      // 2. Run benchmark
      const results = await this.aiProvider.benchmark(
        request.prompt,
        request.model,
        request.iterations
      );
      
      // 3. Save results
      for (const result of results) {
        await this.benchmarkRepository.addResult({
          benchmarkId: benchmark.id,
          iteration: result.iteration,
          latencyMs: result.latency_ms,
          tokensPerSecond: result.tokens_per_second,
          ttftMs: result.ttft_ms,
          success: result.success,
          errorMessage: result.error_message,
        });
      }
      
      // 4. Calculate readiness score
      const successfulResults = results.filter(r => r.success);
      const averageLatency = successfulResults.length > 0
        ? successfulResults.reduce((sum, r) => sum + r.latency_ms, 0) / successfulResults.length
        : 0;
      
      const readinessScore = this.readinessCalculator.calculate({
        hardwareFit: 50, // TODO: Get from device
        latencyMs: averageLatency,
        privacyLevel: request.provider === 'ollama' ? 'high' : 'low',
        estimatedCost: 0.01, // TODO: Calculate based on provider
        reliabilityScore: (successfulResults.length / results.length) * 100,
      });
      
      // 5. Save readiness score
      await this.benchmarkRepository.addReadinessScore({
        benchmarkId: benchmark.id,
        hardwareFit: 50,
        latencyScore: Math.max(0, 100 - (averageLatency / 100)),
        privacyScore: request.provider === 'ollama' ? 100 : 30,
        costScore: 90,
        reliabilityScore: (successfulResults.length / results.length) * 100,
        overallReadiness: readinessScore,
        recommendation: readinessScore >= 70 ? 'Recommended' : 'Not recommended',
        evidence: [`Average latency: ${averageLatency}ms`, `Success rate: ${(successfulResults.length / results.length) * 100}%`],
        limitations: successfulResults.length < results.length ? ['Some iterations failed'] : [],
      });
      
      // 6. Update benchmark status
      await this.benchmarkRepository.update(benchmark.id, {
        status: 'completed',
        completedAt: new Date(),
      });
      
      return {
        benchmark,
        results,
        readinessScore,
      };
    } catch (error) {
      // Update benchmark status to failed
      await this.benchmarkRepository.update(benchmark.id, {
        status: 'failed',
      });
      throw error;
    }
  }
}
