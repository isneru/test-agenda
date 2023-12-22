import { useDebounce } from '@lib/hooks'
import { Test, Warranty } from '@prisma/client'
import { api } from '@utils/api'
import { useState } from 'react'

type OrderDescriptionProps = {
	order: Test | Warranty
}

export const OrderDescription = ({ order }: OrderDescriptionProps) => {
	const [input, setInput] = useState(order.description ?? '')
	const { mutate: changeTestDescription } =
		api.test.changeDescription.useMutation()
	const { mutate: changeWarrantyDescription } =
		api.warranty.changeDescription.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()

	useDebounce(
		() => {
			if (order.description === input) return

			if ('isFPS' in order) {
				changeTestDescription(
					{ orderId: order.id, description: input },
					{ onSettled: () => refetchTests() }
				)
			} else {
				changeWarrantyDescription(
					{ orderId: order.id, description: input },
					{ onSettled: () => refetchWarranties() }
				)
			}
		},
		[input],
		2000
	)

	return (
		<div className='flex w-full flex-col gap-2 mt-auto'>
			<span className='text-xl font-bold'>Observações</span>
			<textarea
				disabled={order.resolved}
				className='rounded bg-red-500 px-2 text-lg w-full font-medium outline-none resize-none h-32 overflow-x-auto'
				onChange={e => setInput(e.target.value)}
				value={input}
			/>
		</div>
	)
}
