import { poppins } from '@lib/font'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Unauthorized() {
	const { data: session } = useSession()
	const router = useRouter()

	if (!!session) {
		router.push('/')
	}

	return (
		<>
			<Head>
				<title>Cex Order Agenda</title>
				<link rel='icon' href='/cex.png' />
				<meta name='description' content='Organizing orders since 1992.' />
			</Head>
			<main
				className={clsx(
					poppins.className,
					'flex flex-col items-center justify-center h-screen w-full'
				)}>
				<h1 className='text-6xl font-bold'>403</h1>
				<p className='text-2xl font-semibold'>Conta não autorizada.</p>
				<Link
					href='/'
					className='absolute left-1/2 -translate-x-1/2 bottom-6 animate-pulse hover:animate-none'>
					Página Inicial
				</Link>
			</main>
		</>
	)
}
