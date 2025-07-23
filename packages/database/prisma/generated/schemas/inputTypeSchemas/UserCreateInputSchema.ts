import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PostCreateNestedManyWithoutUserInputSchema } from './PostCreateNestedManyWithoutUserInputSchema';

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  passcode: z.number().int(),
  posts: z.lazy(() => PostCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateInputSchema;
