import { OrderDescription, WarrantyRequestId } from '@components'
import { CustomerIdBarcode, OrderIdBarcode } from '@components/barcodes'
import { api } from '@lib/api'
import {
	addThirtyDaysToDate,
	formatDate,
	warrantyValidStatuses
} from '@lib/utils'
import { Warranty as TWarranty } from '@prisma/client'
import clsx from 'clsx'

type WarrantyProps = {
	order: TWarranty
}

export const Warranty = ({ order }: WarrantyProps) => {
	const { mutate: changeStatus } = api.warranty.changeStatus.useMutation()
	const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()
	const { mutate: handleDelete } = api.warranty.delete.useMutation()

	function deleteWarranty() {
		handleDelete(
			{ orderId: order.id },
			{ onSettled: () => refetchWarranties() }
		)
	}

	function changeWarrantyStatus(status: string) {
		changeStatus(
			{ orderId: order.id, status },
			{ onSettled: () => refetchWarranties() }
		)
	}

	return (
		<div className='flex w-[400px] flex-col gap-5 rounded-lg bg-neutral-900 border border-foreground/20 p-3'>
			<OrderIdBarcode orderId={order.id.toUpperCase()} />
			<div className='flex items-center justify-between'>
				<span className='text-xl font-bold'>Prazo de Resolução</span>
				<span className='underline decoration-cex decoration-wavy'>
					{formatDate(addThirtyDaysToDate(order.createdAt), false)}
				</span>
			</div>
			<div className='grid grid-cols-3 gap-2 rounded-md p-1 bg-background shadow'>
				{warrantyValidStatuses.map(status => (
					<button
						onClick={() => changeWarrantyStatus(status)}
						className={clsx(
							'p-1 rounded-md transition-colors hover:bg-cex',
							status === order.status && 'bg-red-800'
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
				onClick={deleteWarranty}
				className='rounded bg-red-800 p-2 transition-colors hover:bg-cex'>
				Marcar como resolvido
			</button>
		</div>
	)
}
