import { ComponentPropsWithRef } from 'react'

export const Spinner = (props: ComponentPropsWithRef<'svg'>) => {
	return (
		<svg
			aria-hidden='true'
			width={64}
			height={64}
			stroke='currentColor'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<g className='spinner origin-center'>
				<circle cx={12} cy={12} r='9.5' fill='none' strokeWidth={2} />
			</g>
		</svg>
	)
}
