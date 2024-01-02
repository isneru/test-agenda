import { OrderDescription } from '@components'
import { CustomerIdBarcode, OrderIdBarcode } from '@components/barcodes'
import { PromptEmailModal } from '@components/modals'
import { Label } from '@components/ui'
import { formatDate, testValidTypes } from '@lib/utils'
import { Test as TTest } from '@prisma/client'
import { CheckIcon } from '@radix-ui/react-icons'
import { api } from '@utils/api'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type TestProps = {
	order: TTest
}

export const Test = ({ order }: TestProps) => {
	const { mutate: complete } = api.test.complete.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { mutate: startTesting } = api.test.markAsBeingTested.useMutation()
	const { mutate: markWaitingPickup } = api.test.markWaitingPickup.useMutation()
	const [isCompleteButtonClicked, setIsCompleteButtonClicked] = useState(false)
	const pathname = usePathname()

	function markAsBeingTested() {
		startTesting({ orderId: order.id }, { onSettled: () => refetchTests() })
	}

	function completeTest() {
		complete({ orderId: order.id }, { onSettled: () => refetchTests() })
	}

	function waitPickup() {
		order.type === 'Normal'
			? setIsCompleteButtonClicked(true)
			: markWaitingPickup(
					{ orderId: order.id },
					{ onSettled: () => refetchTests() }
			  )
	}

	return (
		<div
			className={clsx(
				'flex w-[400px] flex-col gap-5 rounded-lg border bg-neutral-900 p-3',
				order.beingTested
					? 'ring-2 ring-cex shadow-cex border-transparent shadow-lg'
					: 'border border-foreground/20'
			)}>
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
			{!order.beingTested && !order.waitingPickup && (
				<button
					onClick={markAsBeingTested}
					className='rounded bg-red-800 p-2 transition-colors hover:bg-cex'>
					Começar a testar
				</button>
			)}
			{order.beingTested && (
				<button
					onClick={waitPickup}
					className='rounded bg-red-800 p-2 transition-colors hover:bg-cex'>
					Marcar como testado
				</button>
			)}
			{order.waitingPickup && (
				<div className='grid grid-cols-2 gap-6'>
					<button
						onClick={() => setIsCompleteButtonClicked(true)}
						className='rounded p-2 transition-colors hover:underline'>
						Avisar cliente
					</button>
					<button
						onClick={completeTest}
						className='rounded bg-red-800 p-2 transition-colors hover:bg-cex'>
						Completar teste
					</button>
				</div>
			)}
			<PromptEmailModal
				orderId={order.id}
				isModalVisible={isCompleteButtonClicked}
				setIsModalVisible={setIsCompleteButtonClicked}
				sendOnly={pathname === '/pickup'}
			/>
		</div>
	)
}
