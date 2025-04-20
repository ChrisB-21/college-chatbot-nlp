
/// <reference types="vite/client" />

interface Navigator {
  gpu?: GPU;
}

interface GPU {
  requestAdapter(options?: GPURequestAdapterOptions): Promise<GPUAdapter | null>;
}

interface GPUAdapter {
  requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice>;
  requestAdapterInfo(options?: GPURequestAdapterInfoOptions): Promise<GPUAdapterInfo>;
}

interface GPURequestAdapterInfoOptions {
  unmaskHints?: string[];
}

interface GPUAdapterInfo {
  vendor: string;
  architecture: string;
  device: string;
  description: string;
}
