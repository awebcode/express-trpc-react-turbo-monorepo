import { prisma } from "@repo/database";
import { uuid } from "./utils/utils";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { Request, Response } from "express";

export const createContext = async ({
  req,
  res,
}: // eslint-disable-next-line @typescript-eslint/require-await
CreateExpressContextOptions): Promise<Context> => {
  const requestId = uuid();
  res.header("x-request-id", requestId);

  return { req, res, requestId, user: null, prisma: prisma };
};

export type Context = {
  user: null;
  requestId: string;
  req: Request;
  res: Response;
  prisma: typeof prisma;
};
