import { TestDescription } from '@components'
import { CustomerIdBarcode, OrderIdBarcode } from '@components/barcodes'
import { PromptEmailModal } from '@components/modals'
import { useDebounce } from '@lib/hooks'
import { formatDate } from '@lib/utils'
import { Test as TTest } from '@prisma/client'
import { api } from '@utils/api'
import { useState } from 'react'

type TestProps = {
	order: TTest
}

export const Test = ({ order }: TestProps) => {
	const { mutate: resolveTest } = api.test.markAsResolved.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const [isResolveButtonClicked, setIsResolveButtonClicked] = useState(false)

	function markTestAsResolved() {
		resolveTest({ orderId: order.id }, { onSettled: () => refetchTests() })
	}

	return (
		<div className='flex w-[400px] flex-col gap-4 rounded-md bg-red-950 p-3'>
			<OrderIdBarcode orderId={order.id.toUpperCase()} />
			<div className='flex items-center justify-between'>
				<span className='text-2xl font-bold'>Hora Marcada</span>
				<span className='underline decoration-red-300 decoration-wavy'>
					{order.scheduledFor ? formatDate(order.scheduledFor) : 'Teste é FPS'}
				</span>
			</div>
			<CustomerIdBarcode customerId={order.customerId.toUpperCase()} />
			<TestDescription order={order} />
			{!order.resolved && (
				<button
					onClick={
						order.isFPS
							? markTestAsResolved
							: () => setIsResolveButtonClicked(true)
					}
					className='rounded-xl bg-red-900 p-2'>
					Marcar como resolvido
				</button>
			)}
			<PromptEmailModal
				orderId={order.id}
				isModalVisible={isResolveButtonClicked}
				setIsModalVisible={setIsResolveButtonClicked}
			/>
		</div>
	)
}
