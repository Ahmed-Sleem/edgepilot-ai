const { z } = require('zod');

const DeviceSchema = z.object({
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

class DeviceEvaluator {
   (Readiness Score Tool)
  static readiness_score(device, workload) {
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

   (Compare Benchmarks Tool)
  static compare_benchmarks(devices, workload) {
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

module.exports = { DeviceSchema, DeviceEvaluator };
