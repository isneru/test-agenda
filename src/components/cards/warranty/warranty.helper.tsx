import { api } from '@lib/api'
import { Warranty } from '@prisma/client'

export type WarrantyProps = {
	order: Warranty
}

export const useWarrantyHelper = ({ order }: WarrantyProps) => {
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

	return {
		deleteWarranty,
		changeWarrantyStatus
	}
}
