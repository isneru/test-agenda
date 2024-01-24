import { forwardRef, type ComponentPropsWithoutRef } from 'react'

export const Textarea = forwardRef<
	HTMLTextAreaElement,
	ComponentPropsWithoutRef<'textarea'>
>((props, ref) => {
	return (
		<textarea
			className='rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex px-2 text-lg font-medium outline-none resize-none h-32'
			{...props}
			ref={ref}
		/>
	)
})
