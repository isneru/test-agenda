import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	Cross1Icon,
	ExitIcon,
	HamburgerMenuIcon,
	QuestionMarkCircledIcon
} from '@radix-ui/react-icons'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSidebar } from '@lib/providers'

const links = [
	{ href: '/', label: 'Testes' },
	{ href: '/warranties', label: 'Garantias' },
	{ href: '/abandoned', label: 'Abandonados' },
	{ href: '/utils', label: 'Utilidades' }
]

const smallLinks = [
	{ href: '/', label: 'T' },
	{ href: '/warranties', label: 'G' },
	{ href: '/abandoned', label: 'A' },
	{ href: '/utils', label: 'U' }
]

export const Navbar = () => {
	const { isOpen, setIsOpen } = useSidebar()
	const pathname = usePathname()
	const { data: session } = useSession()

	return (
		<motion.aside
			initial={{ x: isOpen ? 0 : -265 }}
			animate={{ x: isOpen ? 0 : -265 }}
			transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
			className='bg-background flex items-center gap-3 border-r border-foreground/20 p-3 h-screen flex-col min-w-[320px] w-full max-w-[320px] fixed z-50'>
			<div className='w-full flex justify-between'>
				<button
					title='Fechar Menu'
					className='rounded-lg transition-colors p-1 ml-auto size-8 items-center justify-center flex hover:bg-foreground/20'
					onClick={() => setIsOpen(false)}>
					<Cross1Icon width={18} height={18} />
				</button>
				{!isOpen && (
					<button
						title='Abrir Menu'
						className='rounded-lg transition-colors p-1 ml-auto size-8 items-center justify-center flex hover:bg-foreground/20'
						onClick={() => setIsOpen(true)}>
						<HamburgerMenuIcon width={18} height={18} />
					</button>
				)}
			</div>
			{isOpen ? (
				<>
					{links.map(({ href, label }) => (
						<Link
							key={href}
							className={clsx(
								'rounded-lg transition-colors hover:bg-cex/20 py-1 px-3 w-full',
								pathname === href
									? 'text-cex bg-cex/20'
									: 'print:hidden bg-foreground/20'
							)}
							href={href}>
							{label}
						</Link>
					))}
					{!!session && (
						<div className='flex flex-col items-start w-full gap-2 mt-auto'>
							<Link
								className={clsx(
									'rounded-lg transition-colors hover:bg-cex/20 py-1 px-3 w-full flex items-center justify-between',
									pathname === '/help'
										? 'text-cex bg-cex/20'
										: 'print:hidden bg-foreground/20'
								)}
								href='/help'>
								<span>Ajuda</span>
								<QuestionMarkCircledIcon width={24} height={24} />
							</Link>
							<button
								className='px-2 py-1 w-full flex flex-col sm:flex-row'
								title='Sair'
								onClick={() => signOut()}>
								Logado em:&nbsp;
								<span className='capitalize font-medium ml-0 sm:ml-auto'>
									{session.user.email?.split('@')[0]}
								</span>
							</button>
						</div>
					)}
				</>
			) : (
				<>
					{smallLinks.map(({ href, label }, i) => (
						<Link
							key={href}
							title={links[i]!.label}
							className={clsx(
								'rounded-lg transition-colors hover:bg-cex/20 p-1 ml-auto size-8 items-center justify-center flex',
								pathname === href
									? 'text-cex bg-cex/20'
									: 'print:hidden bg-foreground/20'
							)}
							href={href}>
							{label}
						</Link>
					))}
					{!!session && (
						<div className='flex flex-col items-start gap-2 mt-auto ml-auto'>
							<Link
								title='Ajuda'
								className={clsx(
									'rounded-lg transition-colors hover:bg-cex/20 p-1 ml-auto size-8 items-center justify-center flex',
									pathname === '/help'
										? 'text-cex bg-cex/20'
										: 'print:hidden bg-foreground/20'
								)}
								href='/help'>
								<QuestionMarkCircledIcon width={20} height={20} />
							</Link>
							<button
								className='rounded-lg transition-colors p-1 ml-auto size-8 items-center justify-center flex hover:bg-foreground/20 print:hidden'
								title='Sair'
								onClick={() => signOut()}>
								<ExitIcon width={20} height={20} />
							</button>
						</div>
					)}
				</>
			)}
		</motion.aside>
	)
}
