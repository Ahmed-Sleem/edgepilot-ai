import { JsonDeviceRepository, OllamaServiceAdapter } from './adapters/jsonDeviceRepository';
import { DeviceEvaluator, Workload } from './domain/deviceEvaluator';

async function main(): Promise<void> {
  console.log('=== EdgePilot AI: Running System Benchmarks & Decision Tools ===\n');

  const repo = new JsonDeviceRepository();
  const ai = new OllamaServiceAdapter();

  const workload: Workload = {
    workloadType: 'Vision Inference & Edge Analytics',
    requiresHeavyGPU: true
  };

  const devices = await repo.getDevices();

  const rankedDevices = DeviceEvaluator.compare_benchmarks(devices, workload);

  console.log('--- Side-by-Side Comparison Dashboard ---');
  rankedDevices.forEach((res, index) => {
    console.log(`${index + 1}. [${res.tier.toUpperCase()}] ${res.deviceName}`);
    console.log(`    Score: ${res.score}/100 | State: ${res.state}`);
    console.log(`    Note: ${res.details}\n`);
  });

  console.log('=== All Benchmarks Completed Successfully ===');
}

main();
