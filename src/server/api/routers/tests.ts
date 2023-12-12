import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

export const testRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        customerId: z.string(),
        testId: z.string(),
        scheduledFor: z.date().min(new Date()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.test.create({
        data: {
          customerId: input.customerId.toUpperCase(),
          id: input.testId.toUpperCase(),
          scheduledFor: input.scheduledFor,
        },
      });
    }),

  markTestAsResolved: publicProcedure
    .input(
      z.object({
        testId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.test.update({
        where: {
          id: input.testId.toUpperCase(),
        },
        data: {
          resolved: true,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.test.findMany({
      where: {
        resolved: false,
      },
      orderBy: { scheduledFor: "asc" },
    });
  }),
});
