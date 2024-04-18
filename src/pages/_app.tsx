import { AppType } from 'next/app'
import { api } from '@lib/api'
import { SessionProvider } from 'next-auth/react'
import { type Session } from 'next-auth'
import { ChangelogProvider, SidebarProvider } from '@lib/providers'

import '@styles/globals.css'

const App: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	return (
		<SidebarProvider>
			<SessionProvider session={session}>
				<ChangelogProvider>
					<Component {...pageProps} />
				</ChangelogProvider>
			</SessionProvider>
		</SidebarProvider>
	)
}

export default api.withTRPC(App)
