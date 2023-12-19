import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@server/api/trpc'

export const testRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        customerId: z.string(),
        orderId: z.string(),
        scheduledFor: z.date().optional(),
        isFPS: z.boolean().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.isFPS) {
        return await ctx.db.test.create({
          data: {
            customerId: input.customerId.toUpperCase(),
            id: input.orderId.toUpperCase(),
            isFPS: true
          }
        })
      } else {
        return await ctx.db.test.create({
          data: {
            customerId: input.customerId.toUpperCase(),
            id: input.orderId.toUpperCase(),
            scheduledFor: input.scheduledFor!
          }
        })
      }
    }),

  markAsResolved: publicProcedure
    .input(
      z.object({
        orderId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.test.update({
        where: {
          id: input.orderId.toUpperCase()
        },
        data: {
          resolved: true
        }
      })
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const allTests = await ctx.db.test.findMany({
      orderBy: { scheduledFor: 'asc' }
    })

    return {
      unresolvedTests: allTests.filter(test => !test.resolved),
      resolvedTests: allTests.filter(test => test.resolved)
    }
  })
})
