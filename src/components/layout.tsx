import { Navbar } from '@components'
import { poppins } from '@lib/font'
import clsx from 'clsx'
import Head from 'next/head'

type LayoutProps = {
	children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Head>
				<title>Cex Order Agenda</title>
				<link rel='icon' href='/cex.png' />
				<meta name='description' content='Organizing orders since 1992.' />
			</Head>
			<div className={clsx(poppins.className, 'flex flex-col w-full')}>
				<Navbar />
				<section className='flex-1'>{children}</section>
			</div>
		</>
	)
}
