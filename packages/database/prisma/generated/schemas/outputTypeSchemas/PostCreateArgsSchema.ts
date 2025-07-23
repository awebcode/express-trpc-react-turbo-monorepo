import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostIncludeSchema } from '../inputTypeSchemas/PostIncludeSchema'
import { PostCreateInputSchema } from '../inputTypeSchemas/PostCreateInputSchema'
import { PostUncheckedCreateInputSchema } from '../inputTypeSchemas/PostUncheckedCreateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
  data: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
}).strict() ;

export default PostCreateArgsSchema;
