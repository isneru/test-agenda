import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'

export const Navbar = () => {
	const pathname = usePathname()

	return (
		<nav className='bg-background flex items-center gap-3 justify-between border-b border-foreground px-10 py-3 w-full'>
			<div className='flex items-center gap-3'>
				<Link
					className={clsx(
						'rounded transition-colors hover:bg-cex/20 py-2 px-5',
						pathname === '/' && 'text-cex'
					)}
					href='/'>
					Testes
				</Link>
				<Link
					className={clsx(
						'rounded transition-colors hover:bg-cex/20 py-2 px-5',
						pathname === '/warranties' && 'text-cex'
					)}
					href='/warranties'>
					Garantias
				</Link>
				<Link
					className={clsx(
						'rounded transition-colors hover:bg-cex/20 py-2 px-5',
						pathname === '/resolved' && 'text-cex'
					)}
					href='/resolved'>
					Resolvidos
				</Link>
			</div>
			<Image src='/cex.png' width='76' height='56' alt='CeX' />
		</nav>
	)
}
