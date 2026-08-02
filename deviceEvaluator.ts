import { z } from 'zod';

export const DeviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  architecture: z.string(),
  tier: z.enum(['edge', 'local', 'cloud']),
  status: z.enum(['ready', 'not-measured', 'conflict']).optional(),
  specs: z.object({
    ram: z.string(),
    hasGPU: z.boolean().default(false)
  }).optional()
});

export type Device = z.infer<typeof DeviceSchema>;

export interface Workload {
  workloadType: string;
  requiresHeavyGPU: boolean;
}

export interface EvaluationResult {
  score: number;
  state: 'PASSED' | 'NOT_MEASURED' | 'CONFLICT_DETECTED';
  details: string;
}

export interface RankedDevice {
  deviceName: string;
  tier: string;
  score: number;
  state: string;
  details: string;
}

export class DeviceEvaluator {
  /** (Readiness Score Tool) */
  static readiness_score(device: Device, workload: Workload): EvaluationResult {
    if (!device.status || device.status === 'not-measured') {
      return { score: 0, state: 'NOT_MEASURED', details: 'Not enough data.' };
    }

    if (device.tier === 'edge' && workload.requiresHeavyGPU) {
      return { score: 20, state: 'CONFLICT_DETECTED', details: 'Edge device cannot handle heavy GPU workload.' };
    }

    let score = 70; // Base score
    if (device.tier === 'cloud' || device.specs?.hasGPU) score += 25;
    if (device.status === 'ready') score += 5;

    return {
      score: Math.min(score, 100),
      state: 'PASSED',
      details: `${device.name} fits the workload requirements well.`
    };
  }

  /** (Compare Benchmarks Tool) */
  static compare_benchmarks(devices: Device[], workload: Workload): RankedDevice[] {
    const results = devices.map(device => {
      const evaluation = this.readiness_score(device, workload);
      return {
        deviceName: device.name,
        tier: device.tier,
        score: evaluation.score,
        state: evaluation.state,
        details: evaluation.details
      };
    });

    return results.sort((a, b) => b.score - a.score);
  }
}
