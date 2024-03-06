import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure
} from '@server/api/trpc'
import { z } from 'zod'

export const testRouter = createTRPCRouter({
	create: protectedProcedure
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
					scheduledFor: input.scheduledFor,
					user: {
						connect: {
							email: ctx.session.user.email as string
						}
					}
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
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const normalTests = await ctx.db.test.findMany({
			where: {
				type: 'Normal',
				user: {
					email: ctx.session.user.email
				}
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
				user: {
					email: ctx.session.user.email
				},
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
	changeDesc: protectedProcedure
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
	startTest: protectedProcedure
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
