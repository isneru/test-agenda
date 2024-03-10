import { AppType } from 'next/app'
import { api } from '@lib/api'
import { SessionProvider } from 'next-auth/react'
import { type Session } from 'next-auth'
import { ChangelogProvider } from '@lib/providers'

import '@styles/globals.css'

const App: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	return (
		<SessionProvider session={session}>
			<ChangelogProvider>
				<Component {...pageProps} />
			</ChangelogProvider>
		</SessionProvider>
	)
}

export default api.withTRPC(App)
