import { z } from "zod";
import type { UserSchema } from "../../../prisma/generated/schemas";

export type LoginInputType = z.infer<typeof UserSchema>;