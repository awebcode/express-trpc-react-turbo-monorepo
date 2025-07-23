// src/api/routers/auth/services.ts
import { UserSchema, type User, type UserCreateInputSchema } from "@repo/database";
import { Context } from "../../context";
export class AuthService {
  constructor(private ctx: Context) {}

  async login(loginInput: User) {
    const user = await this.ctx.prisma.user.findUnique({
      where: { email: loginInput.email },
    });
    if (!user) throw new Error("Invalid credentials");

    // const isValid = await bcrypt.compare(password, user.password);
    // if (!isValid) throw new Error("Invalid credentials");

    // const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET!);
    return user;
  }
  //register

  async register(registerInput: RegisterInputType) {
    const user = await this.ctx.prisma.user.create({
      data: {
        email: registerInput.email,
        name: registerInput.name,
        passcode: registerInput.passcode,
      },
    });
    return user;
  }
}
