import { createTRPCRouter, publicProcedure } from '@server/api/trpc'
import { z } from 'zod'

export const warrantyRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        customerId: z.string(),
        orderId: z.string(),
        description: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.warranty.create({
        data: {
          customerId: input.customerId.toUpperCase(),
          id: input.orderId.toUpperCase(),
          description: input.description,
          status: 'Em Análise'
        }
      })
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const allWarranties = await ctx.db.warranty.findMany({
      orderBy: { createdAt: 'asc' }
    })

    return {
      unresolvedWarranties: allWarranties.filter(
        warranty => !warranty.resolved
      ),
      resolvedWarranties: allWarranties.filter(warranty => warranty.resolved)
    }
  }),
  changeStatus: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        status: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.warranty.update({
        where: {
          id: input.orderId.toUpperCase()
        },
        data: {
          status: input.status
        }
      })
    }),
  markAsResolved: publicProcedure
    .input(
      z.object({
        orderId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.warranty.update({
        where: {
          id: input.orderId.toUpperCase()
        },
        data: {
          resolved: true
        }
      })
    }),
  changeRequestId: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        warrantyRequestId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.warranty.update({
        where: {
          id: input.orderId.toUpperCase()
        },
        data: {
          warrantyRequestId: input.warrantyRequestId
        }
      })
    })
})
