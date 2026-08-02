import { Device } from '../domain/deviceEvaluator';

export abstract class DeviceRepository {
  async getDevices(): Promise<Device[]> {
    throw new Error('Not implemented yet');
  }
}

export abstract class AIServicePort {
  async getInsight(prompt: string): Promise<string> {
    throw new Error('Not implemented yet');
  }
}
