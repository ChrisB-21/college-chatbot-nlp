
export const checkWebGPUCompatibility = async (): Promise<{
  isSupported: boolean;
  adapterInfo?: any;
  errorMessage?: string;
}> => {
  try {
    if (!navigator.gpu) {
      return {
        isSupported: false,
        errorMessage: "WebGPU is not supported in this browser. Try using Chrome 113+ or Chrome Canary."
      };
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      return {
        isSupported: false,
        errorMessage: "WebGPU adapter could not be requested. Your GPU may not be compatible or WebGPU may be disabled."
      };
    }

    let adapterInfo = { vendor: "Unknown", architecture: "Unknown", device: "Unknown", description: "GPU information unavailable" };
    
    try {
      if (adapter.requestAdapterInfo && typeof adapter.requestAdapterInfo === 'function') {
        adapterInfo = await adapter.requestAdapterInfo({
          unmaskHints: ["vendor", "architecture", "device", "description"]
        });
        console.log("Adapter info retrieved:", adapterInfo);
      }
    } catch (infoError) {
      console.warn("Could not get adapter info:", infoError);
    }
    
    return {
      isSupported: true,
      adapterInfo
    };
  } catch (error) {
    console.error("Error checking WebGPU compatibility:", error);
    return {
      isSupported: false,
      errorMessage: `Error checking WebGPU compatibility: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};
