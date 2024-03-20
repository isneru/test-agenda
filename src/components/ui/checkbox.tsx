import { CheckIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

type CheckboxProps = HTMLAttributes<HTMLButtonElement> & {
	checked: boolean
}

export const Checkbox = ({ checked, ...props }: CheckboxProps) => {
	return (
		<button
			type='button'
			className={clsx(
				'h-5 w-5 rounded-sm ring-1 data-[checked=true]:bg-red-800 text-black data-[checked=true]:ring-cex data-[checked=false]:bg-background data-[checked=false]:ring-foreground/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex flex items-center justify-center',
				props.className
			)}
			data-checked={checked}
			onClick={props.onClick}>
			{checked && <CheckIcon />}
		</button>
	)
}
