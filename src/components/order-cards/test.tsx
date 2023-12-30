import { OrderDescription } from '@components'
import { CustomerIdBarcode, OrderIdBarcode } from '@components/barcodes'
import { PromptEmailModal } from '@components/modals'
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
		<div className='flex w-[400px] flex-col gap-5 rounded-lg bg-neutral-900 border border-foreground/20 p-3'>
			<OrderIdBarcode orderId={order.id.toUpperCase()} />
			<div className='flex items-center justify-between'>
				<span className='text-2xl font-bold'>Hora Marcada</span>
				<span className='underline decoration-cex decoration-wavy'>
					{order.scheduledFor ? formatDate(order.scheduledFor) : 'Teste é FPS'}
				</span>
			</div>
			<CustomerIdBarcode customerId={order.customerId.toUpperCase()} />
			<OrderDescription order={order} />
			{!order.resolved && (
				<button
					onClick={
						order.isFPS
							? markTestAsResolved
							: () => setIsResolveButtonClicked(true)
					}
					className='rounded bg-red-800 p-2 transition-colors hover:bg-cex'>
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
