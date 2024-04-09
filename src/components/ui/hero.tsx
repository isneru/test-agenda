type HeroProps = { children: React.ReactNode; title: string }

export const Hero = ({ title, children }: HeroProps) => {
	return (
		<header className='mb-4 flex items-center justify-between gap-4 print:hidden'>
			<h1 className='text-center text-4xl font-bold lg:text-6xl'>{title}</h1>
			{children}
		</header>
	)
}
