// src/api/routers/auth/index.ts
import z from "zod";
import { createRouter, publicProcedure } from "../../trpc";
import { AuthService } from "./services";

import { UserSchema } from "@repo/database";
export const authRouter = createRouter({
  // login: publicProcedure
  //   .meta({
  //     openapi: {
  //       summary: "Login as an existing user",
  //       description: "Login as an existing user",
  //       method: "POST",
  //       path: "/auth/login",
  //       tags: ["auth"],
  //     },
  //   })
  //   .input(UserSchema.pick({ id: true, email: true, passcode: true, name: true }))
  //   .mutation(async ({ input, ctx }) => {
  //     const authService = new AuthService(ctx);
  //     return authService.login(input);
  //   }),

  helloGet: publicProcedure
    .meta({
      openapi: {
        summary: "Hello",
        description: "Hello",
        method: "GET",
        path: "/auth/hello",
        tags: ["auth"],
      },
    })
    .input(z.void())
    .output(z.object({ name: z.string() }))
    .query(async ({ ctx }) => {
      return {
        name: "John Doe",
      }
    }),
});
