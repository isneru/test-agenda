import { useTestHelper, type TestProps } from './test.helper'
import { CustomerIdBarcode, OrderIdBarcode } from '@components/barcodes'
import { formatDate, testValidTypes } from '@lib/utils'
import { OrderDescription } from '@components/cards'
import clsx from 'clsx'
import { Loading } from '@components/ui'

export const Test = ({ order }: TestProps) => {
	const { startTest, deleteTest, isLoading } = useTestHelper({ order })

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
			<button
				disabled={isLoading}
				aria-disabled={isLoading}
				onClick={order.beingTested ? deleteTest : startTest}
				className='rounded bg-red-800 p-2 transition-colors hover:bg-cex text-center disabled:bg-red-900 disabled:hover:bg-red-900 disabled:cursor-not-allowed'>
				<Loading
					width={24}
					height={24}
					className='text-center w-full'
					isLoading={isLoading}>
					{order.beingTested ? 'Marcar como resolvido' : 'Começar a testar'}
				</Loading>
			</button>
		</div>
	)
}
