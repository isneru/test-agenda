import { createTRPCRouter, protectedProcedure } from '@server/api/trpc'
import shiki from 'shiki'
import { cookies } from 'next/headers'

export const changelogRouter = createTRPCRouter({
	getCode: protectedProcedure.query(async ({ ctx }) => {
		if (!ctx.session) return

		const changelogResponse = await fetch(
			'https://raw.githubusercontent.com/isneru/test-agenda/main/src/currentVersion.md'
		)
		const changelog = await changelogResponse.text()

		const currentVersion = changelog.match(/##\s*(\d+\.\d+\.\d+)/)?.[1] // [##, <version>]
		if (currentVersion) {
			cookies().set('currentVersion', currentVersion)
		}

		const code = await shiki.codeToHtml(changelog, {
			lang: 'markdown',
			theme: 'github-dark'
		})

		return code
	})
})
