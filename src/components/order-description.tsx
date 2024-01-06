import { useState } from 'react'
import { Test, Warranty } from '@prisma/client'

import { Label, Textarea } from '@components/ui'

import { useDebounce } from '@lib/hooks'

import { api } from '@utils/api'

type OrderDescriptionProps = {
	order: Test | Warranty
}

export const OrderDescription = ({ order }: OrderDescriptionProps) => {
	const [input, setInput] = useState(order.description ?? '')
	const { mutate: handleChangeTDesc } = api.test.changeDesc.useMutation()
	const { mutate: handleChangeWDesc } = api.warranty.changeDesc.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()

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

	useDebounce(handleDebounce, [input], 2000)

	return (
		<div className='flex w-full flex-col gap-1 mt-auto'>
			<Label value='Observações' htmlFor={`description-${order.id}`} />
			<Textarea
				id={`description-${order.id}`}
				onChange={e => setInput(e.target.value)}
				value={input}
			/>
		</div>
	)
}
