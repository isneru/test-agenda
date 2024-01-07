import { useState } from 'react'
import clsx from 'clsx'
import { Warranty } from '@prisma/client'

import { Label } from '@/components/ui'

import { useDebounce } from '@/lib/hooks'

import { api } from '@/utils/api'

type WarrantyInputProps = {
	order: Warranty
}

export const WarrantyInput = ({ order }: WarrantyInputProps) => {
	const [input, setInput] = useState(order.warrantyRequestId ?? '')
	const { mutate: handleChangeReqId } = api.warranty.changeReqId.useMutation()
	const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()

	function handleDebounce() {
		if (order.warrantyRequestId === input) return
		if (order.status !== 'Substituir') return

		handleChangeReqId(
			{ orderId: order.id, warrantyRequestId: input },
			{ onSettled: () => refetchWarranties() }
		)
	}

	useDebounce(handleDebounce, [input])

	return (
		<div className='flex items-center justify-between w-full'>
			<Label
				value='Nº de Warranty Request'
				htmlFor={`warrantyRequestId-${order.id}`}
			/>
			<input
				disabled={order.status !== 'Substituir'}
				value={order.status === 'Substituir' ? input : 'N/A'}
				onChange={e => setInput(e.target.value)}
				className={clsx(
					'rounded px-2 text-lg font-medium outline-none w-[9ch] text-center',
					order.status === 'Substituir'
						? 'bg-background shadow-[0px_0px_0px_1px_rgba(82,82,82,0.4)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex'
						: 'bg-cex shadow'
				)}
				type='text'
				name={`warrantyRequestId-${order.id}`}
				id={`warrantyRequestId-${order.id}`}
			/>
		</div>
	)
}
