# Vision Benchmark Workload Specification

## Workload

`construction-component-recognition-v1`

This workload evaluates closed-set recognition of one primary
construction-safety component per image.

It is an image-classification workload, not an object-detection workload.
Version 1 does not request bounding boxes, segmentation masks, tracking, or
multi-object scene analysis.

## Supported labels

- `hardhat`
- `safety_vest`
- `gloves`
- `goggles`
- `mask`
- `ladder`
- `safety_cone`

## Response policy

A provider response is accepted only when the complete normalized response maps
to exactly one supported label.

Normalization:

1. Trims surrounding whitespace.
2. Removes one matching pair of surrounding quotes.
3. Converts text to lowercase.
4. Converts spaces and hyphens to underscores.
5. Maps `hard_hat` to `hardhat`.
6. Rejects explanations and unsupported values.

Invalid output is measured separately and is never treated as a ground-truth
class.

## Metrics

The module calculates:

- Exact-match accuracy.
- Macro precision.
- Macro recall.
- Macro F1.
- Per-class precision, recall, F1, and support.
- Invalid-output rate.
- Successful-request rate.
- Median latency.
- P95 latency using nearest rank.
- Sequential throughput.

Macro metrics include classes represented in the evaluated ground truth.
Final dataset evidence must contain all seven supported classes.

## Initial thresholds

- Accuracy greater than or equal to `0.80`.
- Macro F1 greater than or equal to `0.75`.
- Invalid-output rate less than or equal to `0.05`.
- Successful-request rate greater than or equal to `0.95`.

## Integration boundary

The current shared `AIProvider` port accepts text prompts only. The vision
benchmark therefore exposes provider-neutral evaluation contracts without
changing the shared port.

The provider team can later implement an image-capable adapter and translate its
responses into `VisionProviderResponse`.

The generated `VisionBenchmarkEvidence` object is the dashboard integration
contract for version 1.
## Execution boundary validation

The module defines an image-capable `VisionProvider` contract independently of
the shared text-only provider contract.

`executeVisionBenchmark` sends samples to the selected provider sequentially,
preserves sample order, converts thrown provider errors into structured failure
responses, and produces `VisionBenchmarkEvidence` through the deterministic
evaluator.

The automated local and cloud execution tests use deterministic fake providers.
They validate the provider boundary and execution flow only. They do not prove
connectivity, authentication, model availability, image encoding, or output
quality for real Ollama, Gemini, or other production providers.

A real local-provider test and a real cloud-provider test remain blocked until
the provider adapters from the provider feature are available.
