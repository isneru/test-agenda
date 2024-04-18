import { env } from '@env'
import { createTRPCRouter, protectedProcedure } from '@server/api/trpc'
import { parse } from 'marked'

export const changelogRouter = createTRPCRouter({
	getCode: protectedProcedure.query(async ({ ctx }) => {
		if (!ctx.session) return

		const versionToRead = '1.1.1'

		const changelogResponse = await fetch(
			`${env.NEXTAUTH_URL}/changelog/${versionToRead}.md`
		)
		const changelog = await changelogResponse.text()

		const currentVersion = changelog.match(
			/# Versão (\d+\.\d+\.\d+|\d+\.\d+)/
		)?.[1]

		const versionDate = changelog.match(/<date>(.*?)<\/date>/)?.[1]

		if (currentVersion) {
			ctx.res.appendHeader(
				'Set-Cookie',
				`currentVersion=${currentVersion}; Path=/; Max-Age=2592000; SameSite=Lax;`
			)
		}

		const versionDateRegex = /<date>.*?<\/date>/g

		const filteredChangelog = changelog.replace(versionDateRegex, '')

		const code = await parse(filteredChangelog)

		return { code, versionDate }
	})
})
