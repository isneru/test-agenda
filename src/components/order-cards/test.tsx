import { OrderDescription } from '@components'
import { CustomerIdBarcode, OrderIdBarcode } from '@components/barcodes'
import { PromptEmailModal } from '@components/modals'
import { api } from '@lib/api'
import { formatDate, testValidTypes } from '@lib/utils'
import { Test as TTest } from '@prisma/client'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type TestProps = {
	order: TTest
}

export const Test = ({ order }: TestProps) => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { mutate: handleDelete } = api.test.delete.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { mutate: handleStartTest } = api.test.startTest.useMutation()
	const { mutate: handleWaitPickup } = api.test.waitPickup.useMutation()
	const pathname = usePathname()

	function startTest() {
		handleStartTest({ orderId: order.id }, { onSettled: () => refetchTests() })
	}

	function deleteTest() {
		handleDelete({ orderId: order.id }, { onSettled: () => refetchTests() })
	}

	function waitPickup() {
		order.type === 'Normal'
			? setIsModalVisible(true)
			: handleWaitPickup(
					{ orderId: order.id },
					{ onSettled: () => refetchTests() }
			  )
	}

	return (
		<div
			className={clsx(
				'flex w-[400px] flex-col gap-5 rounded-lg border bg-neutral-900 p-3',
				order.beingTested
					? 'ring-2 ring-green-500 shadow-green-500 border-transparent shadow-lg'
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
					onClick={startTest}
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
						onClick={() => setIsModalVisible(true)}
						className='rounded p-2 transition-colors hover:underline'>
						Avisar cliente
					</button>
					<button
						onClick={deleteTest}
						className='rounded bg-red-800 p-2 transition-colors hover:bg-cex'>
						Pago / Devolvido
					</button>
				</div>
			)}
			<PromptEmailModal
				orderId={order.id}
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				sendOnly={pathname === '/pickup'}
			/>
		</div>
	)
}
