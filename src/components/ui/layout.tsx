import { Navbar, Spinner } from '@components/ui'
import { poppins } from '@lib/font'
import clsx from 'clsx'
import Head from 'next/head'
import { useSession, signIn, signOut } from 'next-auth/react'

type LayoutProps = {
	children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
	const { status, data: session } = useSession()
	return (
		<>
			<Head>
				<title>Cex Order Agenda</title>
				<link rel='icon' href='/cex.png' />
				<meta name='description' content='Organizing orders since 1992.' />
			</Head>
			<div className={clsx(poppins.className, 'flex flex-col w-full')}>
				{status === 'unauthenticated' && (
					<main className='flex flex-col items-center justify-center h-screen w-full'>
						<button
							className='text-lg font-medium hover:underline'
							onClick={() => signIn('google')}>
							Login
						</button>
					</main>
				)}
				<Navbar />
				<main className='flex flex-col gap-5 p-10 w-full'>
					{status === 'loading' && (
						<div className='absolute inset-0 flex flex-col gap-6 items-center justify-center bg-background/50'>
							<Spinner />
							<p className='text-lg font-medium animate-pulse'>Loading</p>
						</div>
					)}
					{children}
				</main>
			</div>
		</>
	)
}
