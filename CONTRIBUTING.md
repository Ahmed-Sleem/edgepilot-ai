# Contributing to EdgePilot AI

Thank you for your interest in contributing to EdgePilot AI! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Branching Strategy](#branching-strategy)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing](#testing)
- [Documentation](#documentation)

---

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please be respectful and constructive in all interactions.

---

## 🚀 How to Contribute

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Create a new issue using the **Bug Report** template
3. Include detailed steps to reproduce
4. Add screenshots if applicable

### Suggesting Features

1. Check existing issues for similar suggestions
2. Create a new issue using the **Feature Request** template
3. Explain the use case and benefit

### Submitting Code

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL
- Git

### Setup Steps

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/edgepilot-ai.git
cd edgepilot-ai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Set up database
npx prisma generate
npx prisma db push

# 5. Start development server
npm run dev
```

---

## 🌿 Branching Strategy

### Branch Types

| Branch | Purpose | Example |
|--------|---------|---------|
| `main` | Production-ready | `main` |
| `dev` | Development | `dev` |
| `feature/*` | New features | `feature/12-benchmark-runner` |
| `fix/*` | Bug fixes | `fix/45-latency-calculation` |
| `hotfix/*` | Emergency fixes | `hotfix/78-security-patch` |

### Creating a Branch

```bash
# Update dev branch
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/[issue-id]-[description]

# Example
git checkout -b feature/12-benchmark-runner
```

---

## 📝 Commit Guidelines

### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages.

**Format:**
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Maintenance

**Examples:**
```bash
git commit -m "feat(benchmark): add readiness_score() function"
git commit -m "fix(api): handle missing device error"
git commit -m "docs(readme): update setup instructions"
```

---

## 🔄 Pull Request Process

### Before Submitting

1. ✅ Code follows style guidelines
2. ✅ Self-review completed
3. ✅ Tests written and passing
4. ✅ Documentation updated
5. ✅ No console.log statements
6. ✅ No hardcoded values

### PR Template

```markdown
## Description
[What this PR does]

## Related Issues
Closes #[issue-number]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- [Change 1]
- [Change 2]

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing done

## Screenshots
[If UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No hardcoded values
```

### Review Process

1. **Required:** At least 1 approval
2. **Recommended:** Ahmed Sleem for all PRs
3. **Optional:** Module owner for related PRs

### After Approval

- Squash and merge (recommended)
- Delete feature branch after merge

---

## 🎨 Code Style

### TypeScript

- Use TypeScript strict mode
- Define explicit types (avoid `any`)
- Use interfaces for object shapes
- Use enums for constants

### React

- Use functional components
- Use hooks for state and effects
- Keep components small and focused
- Use TypeScript for props

### Naming Conventions

- **Files:** PascalCase for components (`BenchmarkRunner.tsx`)
- **Variables:** camelCase (`readinessScore`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_ITERATIONS`)
- **Interfaces:** PascalCase with `I` prefix optional (`BenchmarkResult`)

### Imports

```typescript
// External libraries first
import { useState } from 'react';
import { z } from 'zod';

// Internal modules
import { Button } from '@/components/ui/button';
import { BenchmarkResult } from '@/modules/benchmark/core/entities';
```

---

## 🧪 Testing

### Unit Tests

```typescript
// src/modules/benchmark/core/services/__tests__/ReadinessCalculator.test.ts
import { ReadinessCalculator } from '../ReadinessCalculator';

describe('ReadinessCalculator', () => {
  it('should calculate readiness score correctly', () => {
    const calculator = new ReadinessCalculator();
    const result = calculator.calculate({
      hardwareFit: 80,
      latencyScore: 90,
      privacyScore: 70,
      costScore: 85,
      reliabilityScore: 95,
    });
    
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- ReadinessCalculator.test.ts
```

---

## 📚 Documentation

### Code Comments

```typescript
/**
 * Calculates the readiness score for a deployment recommendation.
 * 
 * @param factors - The factors to consider
 * @returns A score between 0-100
 */
function readinessScore(factors: ReadinessFactors): number {
  // Implementation
}
```

### README Updates

- Update README when adding new features
- Include setup instructions for new dependencies
- Add examples for new APIs

---

## 🆘 Getting Help

### Questions?

- **Telegram:** Group chat
- **Email:** ahmad.muhamad@ejust.edu.eg
- **Issues:** Create a new issue

### Blocked?

1. Document the blocker
2. Share in Telegram group
3. Escalate to Integration Lead if needed

---

## 📞 Contact

**Integration Lead:** Ahmed Sleem  
**Email:** ahmad.muhamad@ejust.edu.eg  
**Phone:** 01288398475 (emergencies only)

---

Thank you for contributing to EdgePilot AI! 🚀
