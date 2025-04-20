
import React, { useState, useEffect } from 'react';
import { checkWebGPUCompatibility } from '../services/nlpService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Cpu, Check, X, AlertCircle, Terminal, Info, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const WebGPUDiagnostic: React.FC = () => {
  const [diagnosticResult, setDiagnosticResult] = useState<{
    isSupported?: boolean;
    adapterInfo?: any;
    errorMessage?: string;
    modelLoadStatus?: {
      attempted: boolean;
      success: boolean;
      error?: string;
    };
    checked: boolean;
  }>({
    checked: false
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Check for any model loading errors in session storage
  useEffect(() => {
    const modelLoadError = sessionStorage.getItem('model_load_error');
    if (modelLoadError) {
      setDiagnosticResult(prev => ({
        ...prev,
        modelLoadStatus: {
          attempted: true,
          success: false,
          error: modelLoadError
        }
      }));
    }
    
    const modelLoadSuccess = sessionStorage.getItem('model_load_success');
    if (modelLoadSuccess === 'true') {
      setDiagnosticResult(prev => ({
        ...prev,
        modelLoadStatus: {
          attempted: true,
          success: true
        }
      }));
    }
  }, []);

  const runDiagnostic = async () => {
    setIsLoading(true);
    try {
      const result = await checkWebGPUCompatibility();
      setDiagnosticResult({
        ...result,
        checked: true
      });
      
      if (result.isSupported) {
        toast({
          title: "WebGPU Compatibility",
          description: "Your system supports WebGPU! GPU acceleration is available.",
          variant: "default"
        });
      } else {
        toast({
          title: "WebGPU Compatibility",
          description: result.errorMessage || "Your system doesn't support WebGPU.",
          variant: "destructive"
        });
      }
    } catch (error) {
      setDiagnosticResult({
        isSupported: false,
        errorMessage: `Error running diagnostic: ${error instanceof Error ? error.message : String(error)}`,
        checked: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-4 border-dashed">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Cpu className="mr-2" /> WebGPU Compatibility Check
        </CardTitle>
        <CardDescription>
          Check if your system supports GPU acceleration for this chatbot
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!diagnosticResult.checked ? (
          <p className="text-sm text-gray-500">
            Click the button below to check if your browser and GPU support WebGPU acceleration
          </p>
        ) : diagnosticResult.isSupported ? (
          <div>
            <div className="flex items-center text-green-600 mb-2">
              <Check className="mr-2" /> WebGPU is supported on your system!
            </div>
            
            {diagnosticResult.adapterInfo && Object.keys(diagnosticResult.adapterInfo).length > 0 ? (
              <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
                <p className="font-semibold mb-1 flex items-center">
                  <Terminal className="mr-2 h-4 w-4" /> GPU Information:
                </p>
                <ul className="text-gray-700 space-y-1 pl-6 list-disc">
                  {diagnosticResult.adapterInfo.vendor && (
                    <li>Vendor: {diagnosticResult.adapterInfo.vendor}</li>
                  )}
                  {diagnosticResult.adapterInfo.architecture && (
                    <li>Architecture: {diagnosticResult.adapterInfo.architecture}</li>
                  )}
                  {diagnosticResult.adapterInfo.description && (
                    <li>Description: {diagnosticResult.adapterInfo.description}</li>
                  )}
                  {diagnosticResult.adapterInfo.device && (
                    <li>Device: {diagnosticResult.adapterInfo.device}</li>
                  )}
                </ul>
              </div>
            ) : (
              <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertTitle>Limited Information Available</AlertTitle>
                <AlertDescription>
                  Your browser supports WebGPU but detailed GPU information couldn't be retrieved.
                  This may be due to privacy or security settings in your browser.
                </AlertDescription>
              </Alert>
            )}
            
            {/* Model Loading Status */}
            {diagnosticResult.modelLoadStatus?.attempted && (
              <Alert className={`mt-4 ${diagnosticResult.modelLoadStatus.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <Server className={`h-4 w-4 ${diagnosticResult.modelLoadStatus.success ? 'text-green-600' : 'text-red-600'}`} />
                <AlertTitle className={diagnosticResult.modelLoadStatus.success ? 'text-green-700' : 'text-red-700'}>
                  Hugging Face Model Status
                </AlertTitle>
                <AlertDescription className={diagnosticResult.modelLoadStatus.success ? 'text-green-600' : 'text-red-600'}>
                  {diagnosticResult.modelLoadStatus.success 
                    ? "Model loaded successfully from Hugging Face!"
                    : `Failed to load model: ${diagnosticResult.modelLoadStatus.error || "Unknown error"}`}
                </AlertDescription>
              </Alert>
            )}
            
            <Alert className="mt-4 bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-700">Model Loading Issue</AlertTitle>
              <AlertDescription className="text-blue-600">
                Even though WebGPU is supported, the chatbot may run in standard mode if the AI models 
                cannot be loaded from Hugging Face. This might be due to network issues, CORS restrictions,
                or model availability. Check your browser's network tab for more information.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div>
            <div className="flex items-center text-red-600 mb-2">
              <X className="mr-2" /> WebGPU is not supported
            </div>
            {diagnosticResult.errorMessage && (
              <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-md">
                <p className="text-sm flex items-center text-red-800">
                  <AlertCircle className="mr-2 h-4 w-4" /> {diagnosticResult.errorMessage}
                </p>
              </div>
            )}
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium">Recommendations:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Update your browser to Chrome 113+ or Chrome Canary</li>
                <li>Update your GPU drivers</li>
                <li>Check if WebGPU is enabled in chrome://flags or edge://flags</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={runDiagnostic} 
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? 'Checking...' : 'Check WebGPU Compatibility'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WebGPUDiagnostic;
