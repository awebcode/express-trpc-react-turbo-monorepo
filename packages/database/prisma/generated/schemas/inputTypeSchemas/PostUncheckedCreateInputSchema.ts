import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  userId: z.string()
}).strict();

export default PostUncheckedCreateInputSchema;
