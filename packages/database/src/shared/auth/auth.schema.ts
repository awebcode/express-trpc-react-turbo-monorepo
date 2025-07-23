import { UserSchema } from "../../../prisma/generated/schemas";
import { zodPickData } from "../../utils/zodHelpers";
import { z } from "zod";

// Create LoginInput with strict validation
export const LoginInput = zodPickData(UserSchema, ["email", "passcode"], {
  email: z.string().email({ message: "Invalid email address" }),
  passcode: z.string().min(8, { message: "Passcode must be at least 8 characters" }),
  s: z.string().optional(),
});
