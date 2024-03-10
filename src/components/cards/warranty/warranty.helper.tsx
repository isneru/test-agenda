import type { Warranty } from '@prisma/client'
import { api } from '@lib/api'
import { useState } from 'react'
import { warrantyValidStatuses } from '@lib/utils'

export type WarrantyProps = {
	order: Warranty
}

export const useWarrantyHelper = ({ order }: WarrantyProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isStatusLoading, setIsStatusLoading] = useState<
		false | (typeof warrantyValidStatuses)[number]
	>(false)
	const { mutate: changeStatus } = api.warranty.changeStatus.useMutation()
	const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()
	const { mutate: handleDelete } = api.warranty.delete.useMutation()

	function deleteWarranty() {
		setIsLoading(true)
		handleDelete(
			{ orderId: order.id },
			{ onSettled: () => refetchWarranties().then(() => setIsLoading(false)) }
		)
	}

	function changeWarrantyStatus(
		status: (typeof warrantyValidStatuses)[number]
	) {
		setIsStatusLoading(status)
		changeStatus(
			{ orderId: order.id, status },
			{
				onSettled: () =>
					refetchWarranties().then(() => setIsStatusLoading(false))
			}
		)
	}

	return {
		deleteWarranty,
		changeWarrantyStatus,
		isLoading,
		isStatusLoading
	}
}
