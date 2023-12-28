import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

const routes: Record<string, string> = {
	'/': 'Testes',
	'/resolved': 'Resolvidos',
	'/warranties': 'Garantias'
}

type Routes = keyof typeof routes

const linkRemainders: Record<Routes, Array<Routes>> = {
	'/': ['/resolved', '/warranties'],
	'/resolved': ['/', '/warranties'],
	'/warranties': ['/', '/resolved']
}

export const Links = () => {
	const pathname = usePathname()

	return (
		<>
			{linkRemainders[pathname]!.map((path, idx) => (
				<Link
					href={path}
					key={idx}
					className={clsx(
						'fixed bottom-5 flex items-center justify-center rounded-full border border-cex/10 bg-cex/10 px-3 py-1 transition-colors hover:bg-cex/20',
						idx === 0 ? 'left-5' : 'right-5'
					)}>
					{routes[path]}
				</Link>
			))}
		</>
	)
}
