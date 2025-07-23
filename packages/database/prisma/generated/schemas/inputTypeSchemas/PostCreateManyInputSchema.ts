import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  userId: z.string()
}).strict();

export default PostCreateManyInputSchema;
