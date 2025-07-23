import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','passcode']);

export default UserScalarFieldEnumSchema;
