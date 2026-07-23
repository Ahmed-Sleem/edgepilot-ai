import { BenchmarkResult } from '../entities/Benchmark';

export interface ComparisonResult {
  benchmarkId: string;
  provider: string;
  model: string;
  averageLatency: number;
  averageTps: number | null;
  successRate: number;
  rank: number;
}

export class ComparisonEngine {
  compare(results: BenchmarkResult[]): ComparisonResult[] {
    // Group results by benchmark
    const grouped = this.groupByBenchmark(results);
    
    // Calculate averages for each benchmark
    const comparisons = Object.entries(grouped).map(([benchmarkId, results]) => {
      const successful = results.filter(r => r.success);
      const averageLatency = successful.length > 0
        ? successful.reduce((sum, r) => sum + r.latencyMs, 0) / successful.length
        : 0;
      const averageTps = successful.length > 0
        ? successful.reduce((sum, r) => sum + (r.tokensPerSecond || 0), 0) / successful.length
        : null;
      const successRate = results.length > 0
        ? (successful.length / results.length) * 100
        : 0;
      
      return {
        benchmarkId,
        provider: results[0]?.provider || 'unknown',
        model: results[0]?.model || 'unknown',
        averageLatency,
        averageTps,
        successRate,
        rank: 0, // Will be set after sorting
      };
    });
    
    // Sort by latency (lower is better) and assign ranks
    comparisons.sort((a, b) => a.averageLatency - b.averageLatency);
    comparisons.forEach((comp, index) => {
      comp.rank = index + 1;
    });
    
    return comparisons;
  }
  
  private groupByBenchmark(results: BenchmarkResult[]): Record<string, BenchmarkResult[]> {
    return results.reduce((acc, result) => {
      const key = result.benchmarkId;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(result);
      return acc;
    }, {} as Record<string, BenchmarkResult[]>);
  }
}
