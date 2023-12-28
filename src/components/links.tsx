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
						'fixed bottom-5 flex items-center justify-center rounded-full border border-red-800/10 bg-red-900/10 px-3 py-1 text-red-300 transition-colors hover:bg-red-900/20',
						idx === 0 ? 'left-5' : 'right-5'
					)}>
					{routes[path]}
				</Link>
			))}
		</>
	)
}
