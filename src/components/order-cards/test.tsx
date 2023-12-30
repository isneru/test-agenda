import { OrderDescription } from '@components'
import { CustomerIdBarcode, OrderIdBarcode } from '@components/barcodes'
import { PromptEmailModal } from '@components/modals'
import { formatDate, testValidTypes } from '@lib/utils'
import { Test as TTest } from '@prisma/client'
import { api } from '@utils/api'
import clsx from 'clsx'
import { useState } from 'react'

type TestProps = {
	order: TTest
}

export const Test = ({ order }: TestProps) => {
	const { mutate: complete } = api.test.complete.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const [isCompleteButtonClicked, setIsCompleteButtonClicked] = useState(false)

	function completeTest() {
		complete({ orderId: order.id }, { onSettled: () => refetchTests() })
	}

	console.log(order)
	return (
		<div className='flex w-[400px] flex-col gap-5 rounded-lg bg-neutral-900 border border-foreground/20 p-3'>
			<OrderIdBarcode orderId={order.id.toUpperCase()} />
			<div className='flex items-center justify-between'>
				<span className='text-xl font-bold'>Hora Marcada</span>
				<span className='underline decoration-cex decoration-wavy'>
					{!!order.scheduledFor ? formatDate(order.scheduledFor) : 'N/A'}
				</span>
			</div>
			<div className='grid grid-cols-3 gap-2 rounded-md p-1 bg-background shadow w-full'>
				{testValidTypes.map(type => (
					<p
						className={clsx(
							'p-1 rounded-md text-center transition-colors',
							type === order.type && 'bg-red-800'
						)}
						key={type}>
						{type}
					</p>
				))}
			</div>
			<CustomerIdBarcode customerId={order.customerId.toUpperCase()} />
			<OrderDescription order={order} />
			<button
				onClick={
					order.type === 'Normal'
						? () => setIsCompleteButtonClicked(true)
						: () => completeTest()
				}
				className='rounded bg-red-800 p-2 transition-colors hover:bg-cex'>
				Completar teste
			</button>
			<PromptEmailModal
				orderId={order.id}
				isModalVisible={isCompleteButtonClicked}
				setIsModalVisible={setIsCompleteButtonClicked}
			/>
		</div>
	)
}
