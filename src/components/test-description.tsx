import { useDebounce } from '@lib/hooks'
import { Test } from '@prisma/client'
import { api } from '@utils/api'
import { useEffect, useState } from 'react'

type TestDescriptionProps = {
	order: Test
}

export const TestDescription = ({ order }: TestDescriptionProps) => {
	const [input, setInput] = useState(order.description ?? '')
	const debouncedInput = useDebounce(input, 2000)
	const { mutate: changeDescription } = api.test.changeDescription.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()

	useEffect(() => {
		changeDescription(
			{ orderId: order.id, description: debouncedInput },
			{ onSettled: () => refetchTests() }
		)
	}, [debouncedInput])

	return (
		<div className='flex w-full flex-col gap-2 mt-auto'>
			<span className='text-xl font-bold'>Observações</span>
			<textarea
				className='rounded bg-red-500 px-2 text-lg w-full font-medium outline-none resize-none h-32 overflow-x-auto'
				onChange={e => setInput(e.target.value)}
				value={input}
			/>
		</div>
	)
}
