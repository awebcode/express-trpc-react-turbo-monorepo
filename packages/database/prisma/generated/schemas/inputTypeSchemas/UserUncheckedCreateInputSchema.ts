import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostUncheckedCreateNestedManyWithoutUserInputSchema } from './PostUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  passcode: z.number().int(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateInputSchema;
