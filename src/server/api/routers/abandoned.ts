import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure
} from '@server/api/trpc'
import { z } from 'zod'

export const abandonedRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				orderDate: z.date(),
				orderId: z.string(),
				customerId: z.string(),
				products: z.array(
					z.object({
						boxId: z.string().transform(v => v.toUpperCase()),
						passed: z.boolean(),
						serial: z.string().optional(),
						defect: z.string().optional()
					})
				)
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.abandoned.create({
				data: {
					orderDate: input.orderDate,
					id: input.orderId.toUpperCase(),
					customerId: input.customerId.toUpperCase(),
					products: {
						createMany: {
							data: input.products
						}
					},
					user: {
						connect: {
							email: ctx.session.user.email as string
						}
					}
				}
			})
		}),
	getAll: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.abandoned.findMany({
			where: {
				user: {
					email: ctx.session.user.email
				}
			},
			orderBy: [{ orderDate: 'asc' }],
			include: {
				products: true,
				contacts: true
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
			return await ctx.db.abandoned.delete({
				where: {
					id: input.orderId
				},
				include: {
					products: true,
					contacts: true
				}
			})
		}),
	addContact: protectedProcedure
		.input(
			z.object({
				time: z.date(),
				orderId: z.string(),
				answered: z.boolean()
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.contact.create({
				data: {
					time: input.time,
					answered: input.answered,
					abandoned: {
						connect: {
							id: input.orderId
						}
					}
				}
			})
		}),
	toggleSentEmail: protectedProcedure
		.input(
			z.object({
				orderId: z.string(),
				value: z.boolean()
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.abandoned.update({
				where: {
					id: input.orderId
				},
				data: {
					sentEmail: input.value
				}
			})
		}),
	toggleSentLetter: protectedProcedure
		.input(
			z.object({
				orderId: z.string(),
				value: z.boolean()
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.abandoned.update({
				where: {
					id: input.orderId
				},
				data: {
					sentLetter: input.value
				}
			})
		}),
	changeLetterTracking: protectedProcedure
		.input(
			z.object({
				orderId: z.string(),
				value: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.abandoned.update({
				where: {
					id: input.orderId
				},
				data: {
					letterTracking: input.value
				}
			})
		})
})
