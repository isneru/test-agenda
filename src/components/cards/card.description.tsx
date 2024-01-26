import { Label, Textarea } from '@components/ui'
import { api } from '@lib/api'
import { useDebounce } from '@lib/hooks'
import { splitStringWithURL } from '@lib/utils'
import type { Test, Warranty } from '@prisma/client'
import { Fragment, useEffect, useRef, useState } from 'react'

type OrderDescriptionProps = {
	order: Test | Warranty
}

export const OrderDescription = ({ order }: OrderDescriptionProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const [input, setInput] = useState(order.description ?? '')
	const { mutate: handleChangeTDesc } = api.test.changeDesc.useMutation()
	const { mutate: handleChangeWDesc } = api.warranty.changeDesc.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()
	const ref = useRef<HTMLTextAreaElement>(null)
	const splitInputs = splitStringWithURL(input)

	useDebounce(handleDebounce, [input], 2000)

	useEffect(() => {
		isEditing && ref.current?.focus()
	}, [isEditing])

	function handleDebounce() {
		if (order.description === input) return

		if ('type' in order) {
			handleChangeTDesc(
				{ orderId: order.id, description: input },
				{ onSettled: () => refetchTests() }
			)
		} else {
			handleChangeWDesc(
				{ orderId: order.id, description: input },
				{ onSettled: () => refetchWarranties() }
			)
		}
	}

	return (
		<div className='flex w-full flex-col gap-1 mt-auto'>
			<Label value='Observações' htmlFor={`description-${order.id}`} />
			{isEditing ? (
				<Textarea
					spellCheck={false}
					value={input}
					ref={ref}
					id={`description-${order.id}`}
					onBlur={() => setIsEditing(false)}
					onChange={e => setInput(e.target.value)}
					onFocus={e => (e.target.selectionStart = e.target.value.length)}
				/>
			) : (
				<div
					onClick={() => setIsEditing(true)}
					className='cursor-default rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex px-2 text-lg font-medium outline-none resize-none h-32'>
					{splitInputs.map((part, index) => (
						<Fragment key={index}>
							{part.type === 'text' ? (
								<span>{part.text}</span>
							) : (
								<a
									className='inline underline decoration-cex underline-offset-1 text-red-500 h-min'
									href={part.url}
									target='_blank'
									rel='noopener noreferrer'>
									{part.text}
								</a>
							)}
						</Fragment>
					))}
				</div>
			)}
		</div>
	)
}
