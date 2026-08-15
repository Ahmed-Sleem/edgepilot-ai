"use client";

/**
 * EdgePilot AI — Vision Benchmark Page
 * 
 * Computer vision benchmarking dashboard with retro/pixel aesthetic.
 * 
 * @module src/app/vision-benchmark/page
 */

import { useRouter } from "next/navigation";

export default function VisionBenchmarkPage() {
  const router = useRouter();

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
            className="text-[#e6edf3] uppercase hover:text-[#F59E0B]"
          >
            BENCHMARK
          </a>
          <a
            href="/vision-benchmark"
            className="text-[#F59E0B] uppercase"
          >
            VISION
          </a>
        </nav>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#131a25] border-2 border-[#8b949e] p-8 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-4">
            VISION <span className="text-[#F59E0B]">BENCHMARK</span>
          </h1>
          <p className="text-[#8b949e] text-lg max-w-2xl mx-auto mb-6">
            Computer vision benchmarking dashboard. Dataset viewer and performance
            metrics.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <button
              disabled
              className="bg-[#1c2633] text-[#8b949e] px-6 py-3 font-bold uppercase border-2 border-[#8b949e] cursor-not-allowed"
            >
              UPLOAD DATASET
            </button>
            <button
              disabled
              className="bg-[#1E3A8A] text-white px-6 py-3 font-bold uppercase border-2 border-[#1E3A8A] cursor-not-allowed"
            >
              RUN VISION TEST
            </button>
          </div>
          <div className="text-[#8b949e] text-sm border-2 border-dashed border-[#8b949e] p-8">
            [ Vision Dataset Viewer / Results Placeholder ]
          </div>
        </div>
      </div>
    </div>
  );
}
