import { z, infer } from 'zod'

import { createTRPCRouter, publicProcedure } from '@server/api/trpc'
import { refineWarrantyStatus } from '@lib/utils'

export const warrantyRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        customerId: z.string(),
        orderId: z.string(),
        description: z.string(),
        status: z.string().refine(refineWarrantyStatus, {
          message: 'Invalid status'
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.warranty.create({
        data: {
          customerId: input.customerId.toUpperCase(),
          id: input.orderId.toUpperCase(),
          description: input.description,
          status: input.status
        }
      })
    }),

  editWarranty: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        description: z.string(),
        status: z.string().refine(refineWarrantyStatus, {
          message: 'Invalid status'
        }),
        warrantyRequestId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.warranty.update({
        where: {
          id: input.orderId.toUpperCase()
        },
        data: {
          status: input.status,
          description: input.description,
          warrantyRequestId: input.warrantyRequestId
        }
      })
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const allWarranties = await ctx.db.warranty.findMany({
      orderBy: { createdAt: 'asc' }
    })

    return {
      unresolvedWarranties: allWarranties.filter(
        warranty => warranty.status !== 'Resolvido'
      ),
      resolvedWarranties: allWarranties.filter(
        warranty => warranty.status === 'Resolvido'
      )
    }
  })
})
