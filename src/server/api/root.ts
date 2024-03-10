import { changelogRouter } from '@server/api/routers/changelog'
import { emailRouter } from '@server/api/routers/emails'
import { testRouter } from '@server/api/routers/tests'
import { warrantyRouter } from '@server/api/routers/warranties'
import { createTRPCRouter } from '@server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	test: testRouter,
	warranty: warrantyRouter,
	email: emailRouter,
	changelog: changelogRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
