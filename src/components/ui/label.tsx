import clsx from 'clsx'
import { type ComponentProps } from 'react'

type LabelProps = Omit<ComponentProps<'label'>, 'children'> & {
	value: string
}

export const Label = ({ value, className, ...props }: LabelProps) => {
	return (
		<label
			className={clsx('text-xl font-bold cursor-pointer', className)}
			{...props}>
			{value}
		</label>
	)
}
