class DeviceRepository {
  async getDevices() {
    throw new Error('Not implemented yet');
  }
}

class AIServicePort {
  async getInsight(prompt) {
    throw new Error('Not implemented yet');
  }
}

module.exports = { DeviceRepository, AIServicePort };
