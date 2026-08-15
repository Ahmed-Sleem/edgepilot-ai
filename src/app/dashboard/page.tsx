import type { Metadata } from "next";

import { DashboardApp } from "@/components/dashboard/DashboardApp";
import "./dashboard.css";

export const metadata: Metadata = {
  title: "Benchmark Dashboard · EdgePilot AI",
  description:
    "Register a workload and device, run controlled benchmarks against local and cloud providers, and read the readiness score with its evidence and assumptions.",
};

/** /dashboard — module owner: Kareem Ehab (Product UI & Benchmark Dashboard). */
export default function DashboardPage() {
  return <DashboardApp />;
}
