import { createTRPCRouter, protectedProcedure } from '@server/api/trpc'
import { z } from 'zod'

export const warrantyRouter = createTRPCRouter({
	create: protectedProcedure
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
					status: 'Em Análise',
					user: {
						connect: {
							email: ctx.session.user.email as string
						}
					}
				}
			})
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.warranty.findMany({
			where: {
				user: {
					email: ctx.session.user.email as string
				}
			},
			orderBy: { createdAt: 'asc' }
		})
	}),
	changeStatus: protectedProcedure
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
	delete: protectedProcedure
		.input(
			z.object({
				orderId: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.warranty.delete({
				where: {
					id: input.orderId.toUpperCase()
				}
			})
		}),
	changeReqId: protectedProcedure
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
		}),
	changeDesc: protectedProcedure
		.input(
			z.object({
				orderId: z.string(),
				description: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.warranty.update({
				where: {
					id: input.orderId.toUpperCase()
				},
				data: {
					description: input.description
				}
			})
		})
})
