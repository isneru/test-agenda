import { createTRPCRouter, publicProcedure } from '@server/api/trpc'
import { z } from 'zod'

export const testRouter = createTRPCRouter({
	create: publicProcedure
		.input(
			z.object({
				customerId: z.string(),
				orderId: z.string(),
				scheduledFor: z.date().optional(),
				type: z.string(),
				description: z.string().optional()
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.test.create({
				data: {
					customerId: input.customerId.toUpperCase(),
					id: input.orderId.toUpperCase(),
					type: input.type,
					description: input.description,
					scheduledFor: input.scheduledFor
				}
			})
		}),
	delete: publicProcedure
		.input(
			z.object({
				orderId: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.test.delete({
				where: {
					id: input.orderId.toUpperCase()
				}
			})
		}),
	getAll: publicProcedure.query(async ({ ctx }) => {
		const normalTests = await ctx.db.test.findMany({
			where: {
				type: 'Normal'
			},
			orderBy: [
				{
					beingTested: 'desc'
				},
				{
					scheduledFor: 'asc'
				}
			]
		})

		const otherTests = await ctx.db.test.findMany({
			where: {
				NOT: {
					type: 'Normal'
				}
			},
			orderBy: [
				{
					beingTested: 'desc'
				}
			]
		})

		const tests = [...normalTests, ...otherTests]

		return tests
	}),
	changeDesc: publicProcedure
		.input(
			z.object({
				orderId: z.string(),
				description: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.test.update({
				where: {
					id: input.orderId.toUpperCase()
				},
				data: {
					description: input.description
				}
			})
		}),
	startTest: publicProcedure
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
					beingTested: true
				}
			})
		})
})
