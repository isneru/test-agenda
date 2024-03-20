import { type ComponentProps } from 'react'
import clsx from 'clsx'

export const Input = ({ className, ...props }: ComponentProps<'input'>) => {
	return (
		<input
			autoComplete='off'
			className={clsx(
				'rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex px-2 text-lg font-medium outline-none',
				className
			)}
			{...props}
		/>
	)
}
