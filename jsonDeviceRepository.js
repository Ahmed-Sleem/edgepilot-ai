const { DeviceRepository, AIServicePort } = require('../ports/deviceRepository');
const { DeviceSchema } = require('../domain/deviceEvaluator');
const ollama = require('ollama').default;

class JsonDeviceRepository extends DeviceRepository {
  async getDevices() {
    const rawDevices = [
      { id: 'edge-pi4', name: 'Raspberry Pi 4 (ARM, 4GB RAM)', architecture: 'ARM64', tier: 'edge', status: 'ready' },
      { id: 'edge-pi5', name: 'Raspberry Pi 5 (ARM, 8GB RAM)', architecture: 'ARM64', tier: 'edge', status: 'ready' },
      { id: 'local-m1', name: 'MacBook Air M1 (8GB RAM)', architecture: 'ARM64', tier: 'local', status: 'not-measured' },
      { id: 'local-m2', name: 'MacBook Pro M2 (16GB RAM)', architecture: 'ARM64', tier: 'local', status: 'ready' },
      { id: 'pc-rtx', name: 'Gaming PC (Intel i7, 32GB RAM, RTX 3070)', architecture: 'x86_64', tier: 'local', status: 'ready' },
      { id: 'cloud-basic', name: 'Cloud VM Basic (2 vCPU, 4GB RAM)', architecture: 'x86_64', tier: 'cloud', status: 'not-measured' },
      { id: 'cloud-gpu', name: 'Cloud VM GPU (4 vCPU, 16GB RAM, T4)', architecture: 'x86_64', tier: 'cloud', status: 'ready' },
      { id: 'cloud-high', name: 'Cloud VM High (8 vCPU, 32GB RAM, A100)', architecture: 'x86_64', tier: 'cloud', status: 'ready' }
    ];

    return rawDevices.map(d => DeviceSchema.parse(d));
  }
}

class OllamaServiceAdapter extends AIServicePort {
  async getInsight(prompt) {
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

module.exports = { JsonDeviceRepository, OllamaServiceAdapter };
