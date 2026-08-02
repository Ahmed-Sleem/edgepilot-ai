import { DeviceRepository, AIServicePort } from '../ports/deviceRepository';
import { DeviceSchema, Device } from '../domain/deviceEvaluator';
import ollama from 'ollama';

export class JsonDeviceRepository extends DeviceRepository {
  async getDevices(): Promise<Device[]> {
    const rawDevices = [
      { id: 'edge-pi4', name: 'Raspberry Pi 4 (ARM, 4GB RAM)', architecture: 'ARM64', tier: 'edge', status: 'ready', specs: { ram: '4GB', hasGPU: false } },
      { id: 'edge-pi5', name: 'Raspberry Pi 5 (ARM, 8GB RAM)', architecture: 'ARM64', tier: 'edge', status: 'ready', specs: { ram: '8GB', hasGPU: false } },
      { id: 'local-m1', name: 'MacBook Air M1 (8GB RAM)', architecture: 'ARM64', tier: 'local', status: 'not-measured', specs: { ram: '8GB', hasGPU: true } },
      { id: 'local-m2', name: 'MacBook Pro M2 (16GB RAM)', architecture: 'ARM64', tier: 'local', status: 'ready', specs: { ram: '16GB', hasGPU: true } },
      { id: 'pc-rtx', name: 'Gaming PC (Intel i7, 32GB RAM, RTX 3070)', architecture: 'x86_64', tier: 'local', status: 'ready', specs: { ram: '32GB', hasGPU: true } },
      { id: 'cloud-basic', name: 'Cloud VM Basic (2 vCPU, 4GB RAM)', architecture: 'x86_64', tier: 'cloud', status: 'not-measured', specs: { ram: '4GB', hasGPU: false } },
      { id: 'cloud-gpu', name: 'Cloud VM GPU (4 vCPU, 16GB RAM, T4)', architecture: 'x86_64', tier: 'cloud', status: 'ready', specs: { ram: '16GB', hasGPU: true } },
      { id: 'cloud-high', name: 'Cloud VM High (8 vCPU, 32GB RAM, A100)', architecture: 'x86_64', tier: 'cloud', status: 'ready', specs: { ram: '32GB', hasGPU: true } }
    ];

    return rawDevices.map(d => DeviceSchema.parse(d));
  }
}

export class OllamaServiceAdapter extends AIServicePort {
  async getInsight(prompt: string): Promise<string> {
    try {
      const res = await ollama.chat({
        model: 'gemma4',
        messages: [{ role: 'user', content: prompt }]
      });
      return res.message.content.trim();
    } catch (e) {
      return `Local AI is offline right now.`;
    }
  }
}
