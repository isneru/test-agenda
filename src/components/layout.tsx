import { Links } from '@components'
import { poppins } from '@lib/font'
import Head from 'next/head'
import { usePathname } from 'next/navigation'

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
			<div className={poppins.className + ' p-10'}>
				{children}
				<Links />
			</div>
		</>
	)
}
