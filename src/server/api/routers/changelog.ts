import { createTRPCRouter, protectedProcedure } from '@server/api/trpc'
import { parse } from 'marked'

export const changelogRouter = createTRPCRouter({
	getCode: protectedProcedure.query(async ({ ctx }) => {
		if (!ctx.session) return

		const changelogResponse = await fetch(
			'https://raw.githubusercontent.com/isneru/test-agenda/main/currentVersion.md'
		)
		const changelog = await changelogResponse.text()

		const currentVersion = changelog.match(/# Versão (\d+\.\d+\.\d+)/)?.[1]

		const versionDate = changelog.match(/<date>(.*?)<\/date>/)?.[1]

		if (currentVersion) {
			ctx.res.appendHeader(
				'set-cookie',
				`currentVersion=${currentVersion} ; path=/`
			)
		}

		const versionDateRegex = /<date>.*?<\/date>/g
		const filteredChangelog = changelog.replace(versionDateRegex, '')

		const code = await parse(filteredChangelog)
		console.log({ code, versionDate, currentVersion })
		return { code, versionDate }
	})
})
