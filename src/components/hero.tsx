type HeroProps = {
	onClick: () => void
	titleLabel: string
	buttonLabel: string
}

export const Hero = ({ onClick, titleLabel, buttonLabel }: HeroProps) => {
	return (
		<header className='mb-4 flex items-center justify-between px-10 gap-4'>
			<h1 className='text-center text-6xl font-bold'>{titleLabel}</h1>
			<button onClick={onClick} className='rounded-lg bg-cex p-2'>
				{buttonLabel}
			</button>
		</header>
	)
}
