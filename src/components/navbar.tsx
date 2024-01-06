import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

const links = [
	{ href: '/', label: 'Testes' },
	{ href: '/pickup', label: 'Para Levantar' },
	{ href: '/warranties', label: 'Garantias' }
]

export const Navbar = () => {
	const pathname = usePathname()

	return (
		<nav className='bg-background flex items-center gap-3 border-b border-foreground/40 px-10 py-3 w-full'>
			{links.map(({ href, label }) => (
				<Link
					key={href}
					className={clsx(
						'rounded transition-colors hover:bg-cex/20 py-2 px-5',
						pathname === href && 'text-cex bg-cex/20'
					)}
					href={href}>
					{label}
				</Link>
			))}
		</nav>
	)
}
