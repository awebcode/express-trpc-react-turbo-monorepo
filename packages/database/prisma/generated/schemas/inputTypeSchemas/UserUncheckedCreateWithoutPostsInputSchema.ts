import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  passcode: z.number().int()
}).strict();

export default UserUncheckedCreateWithoutPostsInputSchema;
