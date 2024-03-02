import { poppins } from '@lib/font'
import clsx from 'clsx'
import Head from 'next/head'

export default function Unauthorized() {
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
				<p className='text-2xl font-semibold'>Unauthorized</p>
			</main>
		</>
	)
}
