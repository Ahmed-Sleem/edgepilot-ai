"use client";

/**
 * EdgePilot AI — Home Page
 * 
 * Landing page with retro/pixel aesthetic.
 * Provides navigation to benchmark and vision dashboards.
 * 
 * @module src/app/page
 */

import { useRouter } from "next/navigation";

export default function Home() {
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
            className="text-[#e6edf3] uppercase hover:text-[#F59E0B]"
          >
            VISION
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-6">
          Compare local & cloud AI
          <br />
          <span className="text-[#F59E0B]">with real benchmarks.</span>
        </h1>
        <p className="text-[#8b949e] text-lg max-w-2xl mx-auto mb-8">
          EdgePilot AI helps teams compare local and cloud AI deployment options
          with real benchmarks and evidence-based recommendations.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-[#1E3A8A] text-white px-6 py-3 font-bold uppercase border-2 border-[#1E3A8A] hover:bg-[#2d4a9a] transition-colors"
          >
            GET STARTED
          </button>
          <button
            onClick={() => router.push("/vision-benchmark")}
            className="bg-transparent text-[#e6edf3] px-6 py-3 font-bold uppercase border-2 border-[#8b949e] hover:border-[#e6edf3] transition-colors"
          >
            VISION BENCHMARK
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        <div className="bg-[#131a25] border-2 border-[#8b949e] p-6">
          <h3 className="font-bold mb-2">Feature 01</h3>
          <p className="text-[#8b949e]">Real-world workload simulation</p>
        </div>
        <div className="bg-[#131a25] border-2 border-[#8b949e] p-6">
          <h3 className="font-bold mb-2">Feature 02</h3>
          <p className="text-[#8b949e]">Multi-provider comparison</p>
        </div>
        <div className="bg-[#131a25] border-2 border-[#8b949e] p-6">
          <h3 className="font-bold mb-2">Feature 03</h3>
          <p className="text-[#8b949e]">Evidence-based scoring</p>
        </div>
        <div className="bg-[#131a25] border-2 border-[#8b949e] p-6">
          <h3 className="font-bold mb-2">Feature 04</h3>
          <p className="text-[#8b949e]">Exportable JSON reports</p>
        </div>
      </div>
    </div>
  );
}
