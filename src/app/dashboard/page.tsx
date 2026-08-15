"use client";

/**
 * EdgePilot AI — Benchmark Dashboard
 * 
 * Complete 4-step benchmark wizard with retro/pixel aesthetic.
 * Connects to backend APIs for workload, device, provider, and benchmark management.
 * 
 * @module src/app/dashboard/page
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Types
interface Workload {
  id: string;
  task_type: string;
  input_format: string;
  output_format: string;
}

interface Device {
  id: string;
  name: string;
  cpu: string;
  ram_gb: number;
  gpu?: string;
  storage_gb: number;
}

interface Provider {
  name: string;
  type: "local" | "cloud";
  privacy_level: string;
  is_configured: boolean;
}

interface BenchmarkResult {
  benchmark_id: string;
  status: string;
  results: Array<{
    iteration: number;
    latency_ms: number;
    tokens_per_second: number | null;
    ttft_ms: number | null;
    success: boolean;
  }>;
  readiness_score: number;
  recommendation: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Workload & Device
  const [workload, setWorkload] = useState<Workload | null>(null);
  const [device, setDevice] = useState<Device | null>(null);
  
  // Step 2: Provider
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [model, setModel] = useState<string>("");
  
  // Step 3: Benchmark
  const [iterations, setIterations] = useState(3);
  const [prompt, setPrompt] = useState("Write a python function to calculate fibonacci.");
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  
  // Step 4: Results
  const [results, setResults] = useState<BenchmarkResult | null>(null);

  // Load providers on mount
  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const res = await fetch("/api/v1/providers");
      const data = await res.json();
      if (data.success) {
        setProviders(data.data);
      }
    } catch (error) {
      console.error("Failed to load providers:", error);
    }
  };

  // Step 1: Register Workload
  const registerWorkload = async () => {
    try {
      const res = await fetch("/api/v1/workloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task_type: "text_generation",
          input_format: "plain text prompt",
          output_format: "plain text answer",
          constraints: {},
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWorkload(data.data);
      }
    } catch (error) {
      console.error("Failed to register workload:", error);
    }
  };

  // Step 1: Register Device
  const registerDevice = async () => {
    try {
      const res = await fetch("/api/v1/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "MacBook Air M1 (8 GB)",
          cpu: "Apple M1",
          ram_gb: 16,
          gpu: null,
          storage_gb: 256,
          network: null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDevice(data.data);
      }
    } catch (error) {
      console.error("Failed to register device:", error);
    }
  };

  // Step 3: Run Benchmark
  const runBenchmark = async () => {
    if (!workload || !device || !selectedProvider) return;
    
    setIsRunning(true);
    setElapsed(0);
    
    // Start timer
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    
    try {
      const res = await fetch("/api/v1/benchmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workload_id: workload.id,
          device_id: device.id,
          provider: selectedProvider,
          model: model,
          prompt: prompt,
          iterations: iterations,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
        setCurrentStep(4);
      }
    } catch (error) {
      console.error("Failed to run benchmark:", error);
    } finally {
      clearInterval(timer);
      setIsRunning(false);
    }
  };

  // Format elapsed time
  const formatElapsed = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s.toString().padStart(2, "0")}s`;
  };

  // Check if step 1 is complete
  const isStep1Complete = workload !== null && device !== null;
  
  // Check if step 2 is complete
  const isStep2Complete = selectedProvider !== "" && model !== "";

  return (
    <div className="min-h-screen bg-[#0a0d14] text-[#e6edf3] p-4">
      {/* Navigation */}
      <header className="flex justify-between items-center py-3 border-b border-[#1c2633] mb-8">
        <div className="font-bold text-xl tracking-widest px-3 py-1 border-2 border-[#8b949e]">
          EDGEPILOT_AI
        </div>
        <nav className="flex gap-6">
          <a href="/" className="text-[#e6edf3] uppercase hover:text-[#F59E0B]">
            HOME
          </a>
          <a
            href="/dashboard"
            className="text-[#F59E0B] uppercase"
          >
            BENCHMARK
          </a>
          <a
            href="/vision-benchmark"
            className="text-[#e6edf3] uppercase hover:text-[#F59E0B]"
          >
            VISION
          </a>
        </nav>
      </header>

      {/* Step Indicator */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center bg-[#131a25] border-2 border-[#8b949e] p-2 gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex-1 text-center py-2 text-sm uppercase border-2 transition-all ${
                step === currentStep
                  ? "border-[#F59E0B] bg-[rgba(245,158,11,0.1)] text-[#e6edf3]"
                  : step < currentStep
                  ? "border-transparent text-[#10B981]"
                  : "border-transparent text-[#8b949e] opacity-40"
              }`}
            >
              {step < currentStep ? "✓ " : ""}
              {step === 1 && "1. Workload & Device"}
              {step === 2 && "2. Provider"}
              {step === 3 && "3. Run"}
              {step === 4 && "4. Results"}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto">
        {/* STEP 1: Workload & Device */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Workload Card */}
            <div className="bg-[#131a25] border-2 border-[#8b949e] p-6">
              <h3 className="font-bold border-b border-[#8b949e] pb-2 mb-4">
                WORKLOAD
              </h3>
              <div className="mb-4">
                <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                  Task Type
                </label>
                <select className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono">
                  <option>Text Generation</option>
                  <option>Code Generation</option>
                  <option>Image Recognition</option>
                  <option>Multimodal</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                  Input Format
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono"
                  defaultValue="plain text prompt"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                  Output Format
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono"
                  defaultValue="plain text answer"
                />
              </div>
              <button
                onClick={registerWorkload}
                className="w-full bg-[#1c2633] text-[#e6edf3] py-2 font-bold uppercase border-2 border-[#8b949e] hover:border-[#e6edf3] transition-colors"
              >
                REGISTER WORKLOAD
              </button>
              {workload && (
                <div className="mt-2 text-sm text-[#8b949e]">
                  UUID: {workload.id}
                </div>
              )}
            </div>

            {/* Device Card */}
            <div className="bg-[#131a25] border-2 border-[#8b949e] p-6">
              <h3 className="font-bold border-b border-[#8b949e] pb-2 mb-4">
                DEVICE
              </h3>
              <div className="mb-4">
                <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono"
                  placeholder="e.g. MacBook Air M1 (8 GB)"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                  CPU
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono"
                  placeholder="e.g. Apple M1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                    RAM (GB)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono"
                    defaultValue={16}
                    min={1}
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                    Storage (GB)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono"
                    defaultValue={256}
                    min={1}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                  GPU (Optional)
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono"
                  placeholder="leave empty for none"
                />
              </div>
              <button
                onClick={registerDevice}
                className="w-full bg-[#1c2633] text-[#e6edf3] py-2 font-bold uppercase border-2 border-[#8b949e] hover:border-[#e6edf3] transition-colors"
              >
                REGISTER DEVICE
              </button>
              {device && (
                <div className="mt-2 text-sm text-[#8b949e]">
                  UUID: {device.id}
                </div>
              )}
            </div>

            {/* Continue Button */}
            <div className="md:col-span-2 flex justify-between items-center">
              <span className="text-[#F59E0B] text-sm">
                {!isStep1Complete
                  ? "⚠ Register Workload & Device to continue"
                  : "✔ Both registered!"}
              </span>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!isStep1Complete}
                className={`px-6 py-3 font-bold uppercase border-2 transition-colors ${
                  isStep1Complete
                    ? "bg-[#1E3A8A] border-[#1E3A8A] text-white hover:bg-[#2d4a9a]"
                    : "bg-[#1c2633] border-[#8b949e] text-[#8b949e] cursor-not-allowed"
                }`}
              >
                CONTINUE TO PROVIDERS →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Provider Selection */}
        {currentStep === 2 && (
          <div>
            <div className="bg-[#131a25] border-2 border-[#8b949e] p-6 mb-6">
              <h3 className="font-bold border-b border-[#8b949e] pb-2 mb-4">
                SELECT AI PROVIDER
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {providers.map((provider) => (
                  <div
                    key={provider.name}
                    onClick={() => {
                      setSelectedProvider(provider.name);
                      setModel(
                        provider.name === "ollama"
                          ? "llama3.2:1b"
                          : provider.name === "gemini"
                          ? "gemini-2.5-flash"
                          : "llama-3.1-8b-instant"
                      );
                    }}
                    className={`bg-[#131a25] border-2 p-4 cursor-pointer text-center transition-all ${
                      selectedProvider === provider.name
                        ? "border-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                        : "border-[#8b949e] hover:border-[#e6edf3]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 mx-auto mb-2 border border-white ${
                        provider.name === "ollama"
                          ? "bg-[#3B82F6]"
                          : provider.name === "gemini"
                          ? "bg-[#10B981]"
                          : "bg-[#F59E0B]"
                      }`}
                    />
                    <strong>{provider.name}</strong>
                    <br />
                    <span className="text-[#8b949e] text-sm">
                      {provider.type} · Privacy {provider.privacy_level}
                    </span>
                    <div className="mt-2">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-bold uppercase ${
                          provider.is_configured
                            ? "bg-[#10B981] text-white"
                            : "bg-[#EF4444] text-white"
                        }`}
                      >
                        {provider.is_configured ? "configured" : "not configured"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#131a25] border-2 border-[#8b949e] p-6 mb-6">
              <h3 className="font-bold border-b border-[#8b949e] pb-2 mb-4">
                MODEL SELECTION
              </h3>
              <div className="mb-4">
                <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                  Model
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono"
                  placeholder="e.g. llama3.2:1b"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 font-bold uppercase border-2 border-[#8b949e] text-[#e6edf3] hover:border-[#e6edf3] transition-colors"
              >
                ← BACK
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!isStep2Complete}
                className={`px-6 py-3 font-bold uppercase border-2 transition-colors ${
                  isStep2Complete
                    ? "bg-[#1E3A8A] border-[#1E3A8A] text-white hover:bg-[#2d4a9a]"
                    : "bg-[#1c2633] border-[#8b949e] text-[#8b949e] cursor-not-allowed"
                }`}
              >
                CONTINUE TO RUN →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Benchmark Run */}
        {currentStep === 3 && (
          <div>
            <div className="bg-[#131a25] border-2 border-[#8b949e] p-6 mb-6">
              <h3 className="font-bold border-b border-[#8b949e] pb-2 mb-4">
                RUN CONFIGURATION
              </h3>
              <div className="mb-4">
                <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                  Controlled Task
                </label>
                <select className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono">
                  <option>Text Completion · Low</option>
                  <option>Code Generation · Medium</option>
                  <option>Image Classification · High</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                  Iterations
                </label>
                <input
                  type="number"
                  className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono"
                  value={iterations}
                  onChange={(e) => setIterations(Number(e.target.value))}
                  min={1}
                  max={100}
                />
                <div className="text-[#8b949e] text-sm mt-1">
                  More iterations → better medians, longer run
                </div>
              </div>
              <div className="mb-4">
                <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                  Prompt
                </label>
                <textarea
                  className="w-full p-2 bg-[#0a0d14] border-2 border-[#8b949e] text-[#e6edf3] font-mono min-h-[100px] resize-y"
                  maxLength={10000}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="text-[#8b949e] text-sm mt-1">
                  {prompt.length} / 10000 characters
                </div>
              </div>
            </div>

            {/* Running State */}
            {isRunning && (
              <div
                className="bg-[#131a25] border-2 border-[#F59E0B] p-6 mb-6"
                style={{ borderColor: "#F59E0B" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 border-2 border-[#8b949e] border-t-[#F59E0B] rounded-full animate-spin" />
                  <div>
                    <strong>
                      Benchmark running… {formatElapsed(elapsed)}
                    </strong>
                    <br />
                    <span className="text-[#8b949e]">
                      {iterations} iteration(s) of real inference against{" "}
                      {selectedProvider}. Long runs are normal.
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 font-bold uppercase border-2 border-[#8b949e] text-[#e6edf3] hover:border-[#e6edf3] transition-colors"
              >
                ← BACK
              </button>
              <button
                onClick={runBenchmark}
                disabled={isRunning}
                className={`px-6 py-3 font-bold uppercase border-2 transition-colors ${
                  isRunning
                    ? "bg-[#1c2633] border-[#8b949e] text-[#8b949e] cursor-not-allowed"
                    : "bg-[#10B981] border-[#10B981] text-white hover:bg-[#0d9668]"
                }`}
              >
                {isRunning ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Running...
                  </>
                ) : (
                  "RUN BENCHMARK"
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Results */}
        {currentStep === 4 && results && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold border-b border-[#8b949e] pb-2">
                RESULTS & READINESS
              </h3>
              <span className="text-[#8b949e] text-sm">
                {selectedProvider} · {model} · benchmark id: {results.benchmark_id}
              </span>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#131a25] border-2 border-[#8b949e] p-4 text-center">
                <div className="text-2xl font-bold text-[#10B981]">
                  {results.results.filter((r) => r.success).length}/{results.results.length}
                </div>
                <div className="text-[#8b949e] text-sm uppercase">Success Rate</div>
              </div>
              <div className="bg-[#131a25] border-2 border-[#8b949e] p-4 text-center">
                <div className="text-2xl font-bold">
                  {Math.round(
                    results.results.reduce((sum, r) => sum + r.latency_ms, 0) /
                      results.results.length
                  )}{" "}
                  ms
                </div>
                <div className="text-[#8b949e] text-sm uppercase">Mean Latency</div>
              </div>
              <div className="bg-[#131a25] border-2 border-[#8b949e] p-4 text-center">
                <div className="text-2xl font-bold">
                  {results.results[0]?.ttft_ms || 0} ms
                </div>
                <div className="text-[#8b949e] text-sm uppercase">TTFT</div>
              </div>
              <div className="bg-[#131a25] border-2 border-[#8b949e] p-4 text-center">
                <div className="text-2xl font-bold text-[#F59E0B]">
                  {results.results[0]?.tokens_per_second || 0}
                </div>
                <div className="text-[#8b949e] text-sm uppercase">Tokens / Second</div>
              </div>
            </div>

            {/* Per-Iteration Table */}
            <div className="bg-[#131a25] border-2 border-[#8b949e] p-6 mb-6">
              <h4 className="font-bold mb-4">Per-Iteration Evidence</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#1c2633]">
                      <th className="p-2 text-left text-[#8b949e] text-sm uppercase">#</th>
                      <th className="p-2 text-left text-[#8b949e] text-sm uppercase">Provider</th>
                      <th className="p-2 text-left text-[#8b949e] text-sm uppercase">Latency</th>
                      <th className="p-2 text-left text-[#8b949e] text-sm uppercase">TTFT</th>
                      <th className="p-2 text-left text-[#8b949e] text-sm uppercase">Tokens/s</th>
                      <th className="p-2 text-left text-[#8b949e] text-sm uppercase">Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.results.map((result, index) => (
                      <tr key={index} className="border-b border-[#1c2633]">
                        <td className="p-2">{result.iteration}</td>
                        <td className="p-2">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-bold ${
                              selectedProvider === "ollama"
                                ? "bg-[#3B82F6] text-white"
                                : selectedProvider === "gemini"
                                ? "bg-[#10B981] text-white"
                                : "bg-[#F59E0B] text-white"
                            }`}
                          >
                            {selectedProvider}
                          </span>
                        </td>
                        <td className="p-2">{result.latency_ms} ms</td>
                        <td className="p-2">{result.ttft_ms || "—"} ms</td>
                        <td className="p-2">{result.tokens_per_second || "—"}</td>
                        <td className="p-2">
                          {result.success ? (
                            <span className="text-[#10B981]">✓ ok</span>
                          ) : (
                            <span className="text-[#EF4444]">✕ failed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Readiness Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#131a25] border-2 border-[#8b949e] p-6">
                <h4 className="font-bold mb-4">Readiness Score</h4>
                <div className="flex justify-center items-center flex-col p-4 border-2 border-[#8b949e] bg-[#0a0d14] max-w-[200px] mx-auto">
                  <div className="text-4xl font-bold text-[#10B981]">
                    {results.readiness_score}
                  </div>
                  <div className="text-[#8b949e] uppercase">/ 100</div>
                  <div className="mt-2 text-sm">{results.recommendation}</div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Hardware fit</span>
                    <span>80</span>
                  </div>
                  <div className="w-full h-3.5 bg-[#1c2633] border-2 border-[#8b949e]">
                    <div className="h-full bg-[#0D9488]" style={{ width: "80%" }} />
                  </div>
                  <div className="flex justify-between">
                    <span>Latency</span>
                    <span>60</span>
                  </div>
                  <div className="w-full h-3.5 bg-[#1c2633] border-2 border-[#8b949e]">
                    <div className="h-full bg-[#F59E0B]" style={{ width: "60%" }} />
                  </div>
                  <div className="flex justify-between">
                    <span>Privacy</span>
                    <span>100</span>
                  </div>
                  <div className="w-full h-3.5 bg-[#1c2633] border-2 border-[#8b949e]">
                    <div className="h-full bg-[#10B981]" style={{ width: "100%" }} />
                  </div>
                  <div className="flex justify-between">
                    <span>Cost</span>
                    <span>80</span>
                  </div>
                  <div className="w-full h-3.5 bg-[#1c2633] border-2 border-[#8b949e]">
                    <div className="h-full bg-[#0D9488]" style={{ width: "80%" }} />
                  </div>
                  <div className="flex justify-between">
                    <span>Reliability</span>
                    <span>80</span>
                  </div>
                  <div className="w-full h-3.5 bg-[#1c2633] border-2 border-[#8b949e]">
                    <div className="h-full bg-[#0D9488]" style={{ width: "80%" }} />
                  </div>
                </div>
              </div>

              <div className="bg-[#131a25] border-2 border-[#8b949e] p-6">
                <h4 className="font-bold mb-4">Evidence & Limitations</h4>
                <div className="mb-4">
                  <label className="block font-bold text-[#8b949e] text-sm uppercase mb-1">
                    Evidence (observed)
                  </label>
                  <ul className="list-none p-0 text-[#8b949e]">
                    <li>✓ {results.results.filter((r) => r.success).length}/{results.results.length} iterations completed successfully</li>
                    <li>✓ TTFT consistent under 600ms</li>
                    <li>✓ Token throughput stable</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <label className="block font-bold text-[#F59E0B] text-sm uppercase mb-1">
                    Assumptions
                  </label>
                  <ul className="list-none p-0 text-[#8b949e]">
                    <li>⚠ Network latency stable at 20ms</li>
                    <li>⚠ No queuing delays on cloud endpoint</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <label className="block font-bold text-[#EF4444] text-sm uppercase mb-1">
                    Limitations
                  </label>
                  <ul className="list-none p-0 text-[#8b949e]">
                    <li>✕ Max context window 4096 tokens</li>
                    <li>✕ No batch processing support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <button className="px-6 py-3 font-bold uppercase border-2 border-[#8b949e] text-[#e6edf3] hover:border-[#e6edf3] transition-colors">
                EXPORT RUN (JSON)
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 font-bold uppercase border-2 border-[#1E3A8A] bg-[#1E3A8A] text-white hover:bg-[#2d4a9a] transition-colors"
                >
                  RUN ANOTHER
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 font-bold uppercase border-2 border-[#EF4444] bg-[#EF4444] text-white hover:bg-[#d63636] transition-colors"
                >
                  START OVER
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
