import { createTRPCRouter, publicProcedure } from '@server/api/trpc'
import { z } from 'zod'

export const dashboardRouter = createTRPCRouter({
	getTotalOfOrders: publicProcedure.query(async ({ ctx, input }) => {
		const testAmount = await ctx.db.test.count()
		const warrantyAmount = await ctx.db.warranty.count()

		return {
			testAmount,
			warrantyAmount
		}
	})
})
