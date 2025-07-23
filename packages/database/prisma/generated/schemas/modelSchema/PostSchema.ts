import { z } from "zod";
import {
  UserWithRelationsSchema,
  UserPartialWithRelationsSchema,
  UserOptionalDefaultsWithRelationsSchema,
} from "./UserSchema";
import type {
  UserWithRelations,
  UserPartialWithRelations,
  UserOptionalDefaultsWithRelations,
} from "./UserSchema";

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  userId: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

/////////////////////////////////////////
// POST PARTIAL SCHEMA
/////////////////////////////////////////

export const PostPartialSchema = PostSchema.partial();

export type PostPartial = z.infer<typeof PostPartialSchema>;

/////////////////////////////////////////
// POST OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const PostOptionalDefaultsSchema = PostSchema.merge(
  z.object({
    id: z.string().uuid().optional(),
  })
);

export type PostOptionalDefaults = z.infer<typeof PostOptionalDefaultsSchema>;

/////////////////////////////////////////
// POST RELATION SCHEMA
/////////////////////////////////////////

export type PostRelations = {
  user: UserWithRelations;
};

export type PostWithRelations = z.infer<typeof PostSchema> & PostRelations;

export const PostWithRelationsSchema: z.ZodType<PostWithRelations> = PostSchema.merge(
  z.object({
    user: z.lazy(() => UserWithRelationsSchema),
  })
);

/////////////////////////////////////////
// POST OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type PostOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
};

export type PostOptionalDefaultsWithRelations = z.infer<
  typeof PostOptionalDefaultsSchema
> &
  PostOptionalDefaultsRelations;

export const PostOptionalDefaultsWithRelationsSchema: z.ZodType<PostOptionalDefaultsWithRelations> =
  PostOptionalDefaultsSchema.merge(
    z.object({
      user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
    })
  );

/////////////////////////////////////////
// POST PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type PostPartialRelations = {
  user?: UserPartialWithRelations;
};

export type PostPartialWithRelations = z.infer<typeof PostPartialSchema> &
  PostPartialRelations;

export const PostPartialWithRelationsSchema: z.ZodType<PostPartialWithRelations> =
  PostPartialSchema.merge(
    z.object({
      user: z.lazy(() => UserPartialWithRelationsSchema),
    })
  ).partial();

export type PostOptionalDefaultsWithPartialRelations = z.infer<
  typeof PostOptionalDefaultsSchema
> &
  PostPartialRelations;

export const PostOptionalDefaultsWithPartialRelationsSchema: z.ZodType<PostOptionalDefaultsWithPartialRelations> =
  PostOptionalDefaultsSchema.merge(
    z
      .object({
        user: z.lazy(() => UserPartialWithRelationsSchema),
      })
      .partial()
  );

export type PostWithPartialRelations = z.infer<typeof PostSchema> & PostPartialRelations;

export const PostWithPartialRelationsSchema: z.ZodType<PostWithPartialRelations> =
  PostSchema.merge(
    z
      .object({
        user: z.lazy(() => UserPartialWithRelationsSchema),
      })
      .partial()
  );

export default PostSchema;
