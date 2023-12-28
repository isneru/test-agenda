type HeroProps = {
	onClick?: () => void
	title: string
	button?: string
	withButton?: boolean
}

export const Hero = ({ onClick, withButton = true, ...labels }: HeroProps) => {
	return (
		<header className='mb-4 flex items-center justify-between gap-4'>
			<h1 className='text-center text-6xl font-bold'>{labels.title}</h1>
			{withButton && (
				<button onClick={onClick} className='rounded-lg bg-cex p-2'>
					{labels.title}
				</button>
			)}
		</header>
	)
}
