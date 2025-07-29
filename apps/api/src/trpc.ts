import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";
import type { Context } from "./context";
export const t = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create({
    errorFormatter: ({ error, shape }) => {
      if (
        error.code === "INTERNAL_SERVER_ERROR" &&
        process.env.NODE_ENV === "production"
      ) {
        return { ...shape, message: "Internal server error" };
      }
      return shape
    },
  });

export const createRouter = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure: typeof t.procedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      message: "User not found",
      code: "UNAUTHORIZED",
    });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});
