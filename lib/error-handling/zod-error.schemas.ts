import z from "zod";

// 1. Error Names (Enum)
export const ZEErrorName = z.enum([
  "AxiosError",
  "ForbiddenError",
  "ValidationError",
  "RateLimitError",
  "StrapiError",
  "UnexpectedError",
  "ApplicationError",
  "AggregateError",
  "AuthError",
  "ProviderValidationError",
  "UnknownError",
]);

// 2. Strapi Validation Details
const ZStrapiIssue = z.object({
  path: z.array(z.string()),
  message: z.string(),
  name: ZEErrorName,
  value: z.string().optional(),
});

export const ZErrorDetails = z
  .object({
    errors: z.array(ZStrapiIssue).optional(),
  })
  .nullable()
  .optional()
  .or(z.object({}));

export const ZNormalizedError = z.object({
  name: ZEErrorName,
  message: z.string(),
  status: z.number().default(500),
  details: ZErrorDetails,
});

export const ZSafeErrorResponse = z.object({
  success: z.literal(false),
  error: ZNormalizedError,
  data: z.undefined(),
});

export const ZSafeSuccessResponse = z.object({
  success: z.literal(true),
  data: z.unknown(),
});

export const ZStrapiErrorResponse = z.object({
  data: z.null().optional(),
  error: ZNormalizedError,
});

export type TNormalizedError = z.infer<typeof ZNormalizedError>;
export type TStrapiErrorResponse = z.infer<typeof ZStrapiErrorResponse>;
