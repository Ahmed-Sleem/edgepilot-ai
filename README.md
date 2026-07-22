# EdgePilot AI

**Compare local and cloud AI deployment — with real benchmarks, not guesses.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)

---

## Why EdgePilot?

Picking an AI model and where to run it is easy to get wrong.

You try a model on a laptop, it feels fine in a demo, then latency spikes on real hardware, a cloud bill surprises you, or private data should never have left the device. Students, labs, robotics teams, and small engineering groups often choose **without measuring** what actually matters: speed, hardware fit, privacy, reliability, and cost.

**EdgePilot AI** is a decision-support app that helps you answer:

> *Should this workload run locally, in the cloud, or not at all on this device — and why?*

It turns that question into **recorded benchmarks**, a clear **comparison view**, and a **readiness recommendation** grounded in evidence you can export and revisit.

---

## Who it’s for

- AI learners and course projects  
- Robotics and embedded labs  
- Small product/engineering teams evaluating on-device vs API inference  
- Anyone who wants deployment choices backed by numbers, not vibes  

---

## What you can do

| Capability | What you get |
|------------|----------------|
| **Workload wizard** | Describe the AI task you’re evaluating |
| **Device profiles** | Capture CPU, RAM, GPU, storage, and related limits |
| **Provider catalog** | Work with local and cloud options (e.g. Ollama, Gemini, Groq) |
| **Benchmark runs** | Run or record performance measurements |
| **Comparison dashboard** | See results side by side |
| **Readiness score** | A clear recommendation from hardware fit, latency, privacy, cost, and reliability |
| **History & export** | Keep a trail of runs you can share or review later |

### Built-in decision tools

- **`readiness_score()`** — combines hardware fit, latency, privacy, cost, and reliability into a deployment-oriented score  
- **`compare_benchmarks()`** — ranks options using **measured or recorded** results only  

---

## Quick start

### Requirements

- Node.js 18+  
- PostgreSQL  
- [Ollama](https://ollama.com/) (optional, for local models)  

### Run locally

```bash
git clone https://github.com/Ahmed-Sleem/edgepilot-ai.git
cd edgepilot-ai

npm install

cp .env.example .env.local
# Edit .env.local — add database URL and any provider keys you use

npx prisma generate
npx prisma db push

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Environment variables are listed in [`.env.example`](.env.example).  
**Never put secrets in `NEXT_PUBLIC_` variables** — API keys stay on the server only.

---

## Security (short version)

- Provider API keys remain server-side  
- Inputs are validated before use  
- Sensitive routes are meant to be authenticated and rate-limited  

---

## License

MIT — see [LICENSE](LICENSE).

---

## Credits

Built with [Next.js](https://nextjs.org/), [shadcn/ui](https://ui.shadcn.com/), [Ollama](https://ollama.com/), [Google Gemini](https://ai.google.dev/), and [Groq](https://groq.com/).

---

**EdgePilot AI** — measure first, deploy with confidence.
