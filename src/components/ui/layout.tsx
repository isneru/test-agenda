import { Navbar } from '@components/ui'
import { poppins } from '@lib/font'
import clsx from 'clsx'
import Head from 'next/head'
import { useSession, signIn } from 'next-auth/react'

type LayoutProps = {
	children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
	const session = useSession()

	return (
		<>
			<Head>
				<title>Cex Order Agenda</title>
				<link rel='icon' href='/cex.png' />
				<meta name='description' content='Organizing orders since 1992.' />
			</Head>
			<div className={clsx(poppins.className, 'flex flex-col w-full')}>
				{session.data ? (
					<>
						<Navbar />
						<main className='flex flex-col gap-5 p-10 w-full'>{children}</main>
					</>
				) : (
					<main className='flex items-center justify-center h-screen w-full'>
						<button onClick={() => signIn('google')}>Login</button>
					</main>
				)}
			</div>
		</>
	)
}
