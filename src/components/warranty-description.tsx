import { useDebounce } from '@lib/hooks'
import { Warranty } from '@prisma/client'
import { api } from '@utils/api'
import { useEffect, useState } from 'react'

type WarrantyDescriptionProps = {
	order: Warranty
}

export const WarrantyDescription = ({ order }: WarrantyDescriptionProps) => {
	const [input, setInput] = useState(order.description ?? '')
	const debouncedInput = useDebounce(input, 2000)
	const { mutate: changeDescription } =
		api.warranty.changeDescription.useMutation()
	const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()

	useEffect(() => {
		changeDescription(
			{ orderId: order.id, description: debouncedInput },
			{ onSettled: () => refetchWarranties() }
		)
	}, [debouncedInput])

	return (
		<div className='flex w-full flex-col gap-2 mt-auto'>
			<span className='text-xl font-bold'>Descrição do problema</span>
			<textarea
				className='rounded bg-red-500 px-2 text-lg w-full font-medium outline-none resize-none h-32 overflow-x-auto'
				onChange={e => setInput(e.target.value)}
				value={input}
			/>
		</div>
	)
}
