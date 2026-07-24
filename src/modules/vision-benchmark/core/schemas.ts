import { z } from 'zod';
import { VISION_LABELS } from './types';

export const VisionLabelSchema = z.enum(VISION_LABELS);

export const VisionBenchmarkSampleSchema = z.object({
  id: z.string().min(1),
  imagePath: z.string().min(1),
  expectedLabel: VisionLabelSchema,
  licenseVerified: z.literal(true),
  privacyReviewed: z.literal(true),
  sha256: z.string().regex(/^[a-f0-9]{64}$/i),
});

export const VisionDatasetManifestSchema = z.object({
  schemaVersion: z.literal('1.0.0'),
  datasetId: z.string().min(1),
  workloadId: z.literal('construction-component-recognition-v1'),
  manifestVersion: z.string().min(1),
  status: z.enum(['fixture_images_pending', 'ready']),
  labels: z.array(VisionLabelSchema).length(VISION_LABELS.length),
  privacyChecks: z.object({
    peopleAllowed: z.literal(false),
    facesAllowed: z.literal(false),
    personalDataAllowed: z.literal(false),
    locationMetadataAllowed: z.literal(false),
    exifMustBeRemoved: z.literal(true),
    manualReviewRequired: z.literal(true),
  }),
  samples: z.array(VisionBenchmarkSampleSchema),
}).superRefine((manifest, context) => {
  const uniqueLabels = new Set(manifest.labels);

  if (uniqueLabels.size !== VISION_LABELS.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['labels'],
      message: 'The manifest must contain each supported label exactly once.',
    });
  }

  const sampleIds = manifest.samples.map((sample) => sample.id);
  const uniqueSampleIds = new Set(sampleIds);

  if (uniqueSampleIds.size !== sampleIds.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['samples'],
      message: 'Duplicate sample identifiers are not allowed.',
    });
  }

  if (manifest.status === 'ready' && manifest.samples.length === 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['samples'],
      message: 'A ready manifest must contain at least one sample.',
    });
  }
});

export type VisionDatasetManifest = z.infer<
  typeof VisionDatasetManifestSchema
>;