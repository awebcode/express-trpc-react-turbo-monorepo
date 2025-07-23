import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PostCreateWithoutUserInputSchema: z.ZodType<Prisma.PostCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string()
}).strict();

export default PostCreateWithoutUserInputSchema;
