# EdgePilot AI

**Local & Cloud Model Deployment & Device Readiness Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Team](#team)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

EdgePilot AI is a **decision-support platform** that helps teams compare local vs cloud AI deployment options with real benchmarks and evidence-based recommendations.

**Target Users:** AI students, robotics labs, embedded teams, and small engineering groups

**Project Status:** In Development (Session 1 of 5)

---

## 🚨 Problem Statement

Students and small technical teams frequently choose AI models and deployment environments **without measuring**:

- ❌ Latency
- ❌ Privacy implications
- ❌ Hardware limits
- ❌ Failure behavior
- ❌ Operating cost

---

## ✅ Solution

A deployable decision-support platform that:

- ✅ Benchmarks local/cloud AI options
- ✅ Records device constraints
- ✅ Produces evidence-based deployment-readiness recommendations

---

## 🚀 Features

### Mandatory MVP Features

| Feature | Description |
|---------|-------------|
| **Workload Wizard** | Define what AI task you're benchmarking |
| **Device Profile Registry** | Record hardware constraints (CPU, RAM, GPU, etc.) |
| **Local/Cloud Provider Catalog** | Ollama, Gemini, Groq, etc. |
| **Benchmark Runner** | Run or record actual performance tests |
| **Comparison Dashboard** | Visualize results side-by-side |
| **Readiness Score** | Deterministic deployment recommendation |
| **Export & History** | Save and share results |

### Deterministic Tools

1. **`readiness_score()`** — Weighs hardware fit, latency, privacy, cost, reliability
2. **`compare_benchmarks()`** — Ranks only measured/recorded results

---

## 🏛️ Architecture

EdgePilot AI uses **Hexagonal Architecture** (Ports and Adapters) for:

- ✅ **Testability:** Business logic testable without UI
- ✅ **Flexibility:** Easy to swap implementations
- ✅ **Clean Boundaries:** Clear separation of concerns

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Next.js App (React)                                   │  │
│  │  - Dashboard                                           │  │
│  │  - Forms                                               │  │
│  │  - Charts                                              │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    API ROUTES (Server)                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  /api/v1/*                                              │  │
│  │  - Input validation (Zod)                               │  │
│  │  - Authentication                                       │  │
│  │  - Rate limiting                                        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Use Cases                                              │  │
│  │  - RunBenchmark                                         │  │
│  │  - CompareProviders                                     │  │
│  │  - CalculateReadiness                                   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      DOMAIN LAYER                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Entities & Ports                                       │  │
│  │  - Benchmark, Device, Workload                          │  │
│  │  - AIProvider, BenchmarkRepository                      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Adapters                                               │  │
│  │  - PrismaBenchmarkRepository                            │  │
│  │  - OllamaProvider, GeminiProvider, GroqProvider         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Module Structure

```
src/modules/benchmark/
├── core/                    # Domain & Ports
│   ├── entities/            # Business objects
│   ├── ports/               # Interfaces
│   └── services/            # Business logic
├── application/             # Use Cases
│   ├── use-cases/
│   └── dtos/
└── infrastructure/          # Adapters
    ├── repositories/
    └── providers/
```

**Full Architecture Documentation:** [docs/architecture.md](docs/architecture.md)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | Framework (App Router) |
| **React 19** | UI Library |
| **TypeScript 5.3** | Type Safety |
| **Tailwind CSS v4** | Styling |
| **shadcn/ui** | Components |
| **Prisma** | Database ORM |
| **PostgreSQL** | Database |
| **Zod** | Validation |
| **Recharts** | Charts |
| **React Query** | Data Fetching |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Ollama (for local AI)

### Installation

```bash
# Clone the repository
git clone https://github.com/Ahmed-Sleem/edgepilot-ai.git
cd edgepilot-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

See [.env.example](.env.example) for all required variables.

**Critical:** API keys MUST stay server-side. Never use `NEXT_PUBLIC_` for secrets.

---

## 👥 Team

### Team 15 — EdgePilot AI

| Name | Role | Email |
|------|------|-------|
| **Ahmed Sleem** | Integration Lead / Solution Architect | ahmad.muhamad@ejust.edu.eg |
| Adham Yakout | AI, Local Model & DevOps Engineer | Raphaelo8790@gmail.com |
| Kareem Ehab | Product UI & Benchmark Dashboard Engineer | painx00000@gmail.com |
| Moe Samy | Robotics Device Knowledge & Quality Engineer | samy.ma390229877@gmail.com |
| Isa Mahmoud Maher | Computer Vision Benchmark & Model Evaluation Engineer | mahermahmoed563@gmail.com |

---

## 📅 Project Timeline

| Session | Date | Focus |
|---------|------|-------|
| Session 1 | July 21, 2026 | Foundation + Diagnostic |
| Session 2 | July 23, 2026 | Structured Output & Contracts |
| Session 3 | July 25, 2026 | Grounding & Tools |
| Session 4 | July 27, 2026 | Production & Deployment |
| Session 5 | July 29, 2026 | Final Release & Defense |

---

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Quick Contribution Guide

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/12-benchmark-runner`)
3. **Commit** your changes (`git commit -m 'feat(benchmark): add readiness score'`)
4. **Push** to the branch (`git push origin feature/12-benchmark-runner`)
5. **Open** a Pull Request

**Branch Rules:**
- ✅ One feature per branch
- ✅ Create from `dev`
- ✅ Merge back to `dev` via PR
- ✅ At least 1 approval required
- ✅ All tests must pass

---

## 📚 Documentation

- [Architecture](docs/architecture.md) — System architecture and design patterns
- [Workflow](docs/workflow.md) — Repository workflow and branching strategy
- [API Contracts](docs/api-contracts.md) — API endpoints and data schemas
- [Security](docs/security.md) — Security boundaries and best practices
- [Deployment](docs/deployment.md) — Deployment guides

---

## 🔒 Security

**Critical Security Rules:**
- ✅ API keys MUST stay server-side (never use `NEXT_PUBLIC_` for secrets)
- ✅ All inputs validated with Zod
- ✅ Rate limiting on API routes
- ✅ Authentication required for sensitive operations

See [docs/security.md](docs/security.md) for details.

---

## 📊 Scoring Rubric

| Area | Points |
|------|--------|
| Functional completeness | 15 |
| Structured AI output | 15 |
| Trusted knowledge / grounding | 15 |
| Deterministic tool / action | 10 |
| Evaluation & quality evidence | 10 |
| Security, privacy & safe failure | 10 |
| Production deployment | 10 |
| Documentation & evidence | 10 |
| Individual defense | 5 |
| **Total** | **100** |

---

## 📞 Contact

**Integration Lead:** Ahmed Sleem  
**Email:** ahmad.muhamad@ejust.edu.eg  
**Phone:** 01288398475 (emergencies only)  
**Telegram:** 01288398475

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Ollama](https://ollama.com/)
- [Google Gemini](https://ai.google.dev/)
- [Groq](https://groq.com/)

---

**Built with ❤️ by Team 15 — EdgePilot AI**
