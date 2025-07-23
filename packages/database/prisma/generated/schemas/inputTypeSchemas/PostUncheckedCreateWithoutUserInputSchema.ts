import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PostUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string()
}).strict();

export default PostUncheckedCreateWithoutUserInputSchema;
