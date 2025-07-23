import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PostCreateManyUserInputSchema: z.ZodType<Prisma.PostCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string()
}).strict();

export default PostCreateManyUserInputSchema;
