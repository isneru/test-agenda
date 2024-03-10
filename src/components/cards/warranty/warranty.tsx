import { CustomerIdBarcode, OrderIdBarcode } from '@components/barcodes'
import { type WarrantyProps, useWarrantyHelper } from './warranty.helper'
import { WarrantyRequestId } from './warranty.requestId'
import { OrderDescription } from '@components/cards'
import { addThirtyDays, formatDate, warrantyValidStatuses } from '@lib/utils'
import clsx from 'clsx'
import { Loading } from '@components/ui'

export const Warranty = ({ order }: WarrantyProps) => {
	const { deleteWarranty, changeWarrantyStatus, isLoading, isStatusLoading } =
		useWarrantyHelper({ order })

	return (
		<div className='flex w-[400px] flex-col gap-5 rounded-lg bg-neutral-900 border border-foreground/20 p-3'>
			<OrderIdBarcode orderId={order.id.toUpperCase()} />
			<div className='flex items-center justify-between'>
				<span className='text-xl font-bold'>Prazo de Resolução</span>
				<span className='underline decoration-cex decoration-wavy'>
					{formatDate(addThirtyDays(order.createdAt), false)}
				</span>
			</div>
			<div
				className={clsx(
					'grid grid-cols-3 gap-2 rounded-md p-1 bg-background shadow relative isolate'
				)}>
				{warrantyValidStatuses.map(status => (
					<button
						disabled={!!isStatusLoading && isStatusLoading !== status}
						onClick={() => changeWarrantyStatus(status)}
						className={clsx(
							'p-1 rounded-md transition-colors hover:bg-cex',
							status === order.status && !isStatusLoading && 'bg-cex',
							status === isStatusLoading && 'bg-cex warranty-status',
							!!isStatusLoading &&
								isStatusLoading !== status &&
								'text-white/50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:select-none'
						)}
						key={status}>
						{status}
					</button>
				))}
			</div>
			<WarrantyRequestId order={order} />
			<CustomerIdBarcode customerId={order.customerId.toUpperCase()} />
			<OrderDescription order={order} />
			<button
				disabled={isLoading}
				aria-disabled={isLoading}
				onClick={deleteWarranty}
				className='rounded bg-red-800 p-2 transition-colors hover:bg-cex text-center disabled:bg-red-900 disabled:hover:bg-red-900 disabled:cursor-not-allowed'>
				<Loading
					width={24}
					height={24}
					className='text-center w-full'
					isLoading={isLoading}>
					Marcar como resolvido
				</Loading>
			</button>
		</div>
	)
}
