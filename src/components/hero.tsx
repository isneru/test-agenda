type HeroProps =
	| {
			onClick: () => void
			title: string
			btnLabel: string
			type: 'withButton'
	  }
	| {
			title: string
			type: 'withoutButton'
	  }

export const Hero = ({ title, ...p }: HeroProps) => {
	return (
		<header className='mb-4 flex items-center justify-between gap-4'>
			<h1 className='text-center text-6xl font-bold'>{title}</h1>
			{p.type === 'withButton' && (
				<button onClick={p.onClick} className='rounded-lg bg-cex p-2'>
					{p.btnLabel}
				</button>
			)}
		</header>
	)
}
