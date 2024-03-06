import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'

const links = [
	{ href: '/', label: 'Testes' },
	{ href: '/warranties', label: 'Garantias' }
]

export const Navbar = () => {
	const pathname = usePathname()
	const { data: session } = useSession()

	return (
		<nav className='bg-background flex items-center gap-3 border-b border-foreground/40 px-10 py-3 w-full'>
			{links.map(({ href, label }) => (
				<Link
					key={href}
					className={clsx(
						'rounded-lg transition-colors hover:bg-cex/20 py-2 px-5',
						pathname === href
							? 'text-cex bg-cex/20 print:mx-auto'
							: 'print:hidden'
					)}
					href={href}>
					{label}
				</Link>
			))}
			{!!session && (
				<div className='flex items-center ml-auto gap-2'>
					<button className='h-10 px-2' title='Sair' onClick={() => signOut()}>
						Logado em:&nbsp;
						<span className='capitalize font-medium'>
							{session.user.email?.split('@')[0]}
						</span>
					</button>
					<div className='h-10 w-px bg-foreground/40' />
					<Link
						className='px-2 h-10 flex items-center justify-center gap-2 rounded-lg border border-transparent hover:border-foreground/20 hover:bg-white/5 transition-colors print:hidden'
						href='/help'>
						<span>Ajuda</span>
						<QuestionMarkCircledIcon width={24} height={24} />
					</Link>
				</div>
			)}
		</nav>
	)
}
