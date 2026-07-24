# Vision Benchmark Test Cases

The automated suite covers the following cases:

| ID | Area | Scenario |
|---|---|---|
| VB-001 | Normalization | Direct supported label |
| VB-002 | Normalization | Spaces and casing |
| VB-003 | Normalization | Quoted hard-hat alias |
| VB-004 | Normalization | Hyphenated label |
| VB-005 | Normalization | Explanatory output |
| VB-006 | Normalization | Unsupported output |
| VB-007 | Manifest | Valid ready manifest |
| VB-008 | Manifest | Unsupported label |
| VB-009 | Manifest | Duplicate sample ID |
| VB-010 | Manifest | Unverified license |
| VB-011 | Metrics | Perfect predictions |
| VB-012 | Metrics | No correct prediction |
| VB-013 | Metrics | Even-count median |
| VB-014 | Metrics | Nearest-rank P95 |
| VB-015 | Metrics | Invalid successful output |
| VB-016 | Metrics | Provider failure |
| VB-017 | Evaluator | Passing evidence |
| VB-018 | Evaluator | Deterministic evidence |
| VB-019 | Evaluator | Response-count mismatch |
| VB-020 | Evaluator | Missing privacy review |
| VB-021 | Evaluator | Invalid explanatory output |
| VB-022 | Evaluator | Provider error classification |
| VB-023 | Execution | Local provider boundary |
| VB-024 | Execution | Cloud provider boundary |
| VB-025 | Execution | Sequential sample ordering |
| VB-026 | Execution | Thrown provider error |
| VB-027 | Execution | Empty prompt rejection |
