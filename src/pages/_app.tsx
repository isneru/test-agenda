import { AppType } from 'next/app'
import { api } from '@lib/api'
import { SessionProvider } from 'next-auth/react'
import { type Session } from 'next-auth'

import '@styles/globals.css'

const App: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	)
}

export default api.withTRPC(App)
