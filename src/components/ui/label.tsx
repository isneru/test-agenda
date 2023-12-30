import { ComponentProps } from 'react'

type LabelProps = Omit<ComponentProps<'label'>, 'children'> & {
	value: string
}

export const Label = ({ value, ...props }: LabelProps) => {
	return (
		<label className='text-xl font-bold cursor-pointer' {...props}>
			{value}
		</label>
	)
}
