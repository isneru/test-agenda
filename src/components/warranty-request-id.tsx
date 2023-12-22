import { useDebounce } from '@lib/hooks'
import { Warranty } from '@prisma/client'
import { api } from '@utils/api'
import { useState } from 'react'

type WarrantyInputProps = {
	order: Warranty
}

export const WarrantyInput = ({ order }: WarrantyInputProps) => {
	const [input, setInput] = useState(order.warrantyRequestId ?? '')
	const { mutate: changeRequestId } = api.warranty.changeRequestId.useMutation()
	const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()

	useDebounce(() => {
		if (order.warrantyRequestId === input) return
		if (order.status !== 'Substituir') return

		changeRequestId(
			{ orderId: order.id, warrantyRequestId: input },
			{ onSettled: () => refetchWarranties() }
		)
	}, [input])

	return (
		<div className='flex items-center justify-between w-full'>
			<label
				className='text-xl font-bold'
				htmlFor={`warrantyRequestId-${order.id}`}>
				Nº de Warranty Request
			</label>
			<input
				disabled={order.resolved || order.status !== 'Substituir'}
				value={order.status === 'Substituir' ? input : 'N/A'}
				onChange={e => setInput(e.target.value)}
				className='rounded bg-red-500 px-2 text-lg font-medium outline-none w-[10ch] text-center'
				type='text'
				name={`warrantyRequestId-${order.id}`}
				id={`warrantyRequestId-${order.id}`}
			/>
		</div>
	)
}
