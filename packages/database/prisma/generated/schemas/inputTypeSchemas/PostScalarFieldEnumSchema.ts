import { z } from 'zod';

export const PostScalarFieldEnumSchema = z.enum(['id','title','content','userId']);

export default PostScalarFieldEnumSchema;
