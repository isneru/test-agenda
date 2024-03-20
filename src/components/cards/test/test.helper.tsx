import type { Test } from '@prisma/client'
import { api } from '@lib/api'
import { useState } from 'react'

export type TestProps = {
	order: Test
}

export const useTestHelper = ({ order }: TestProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const { mutate: handleDelete } = api.test.delete.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { mutate: handleStartTest } = api.test.startTest.useMutation()

	function startTest() {
		setIsLoading(true)
		handleStartTest(
			{ orderId: order.id },
			{
				onSettled: () => refetchTests().then(() => setIsLoading(false))
			}
		)
	}

	function deleteTest() {
		setIsLoading(true)
		handleDelete(
			{ orderId: order.id },
			{
				onSettled: () => refetchTests().then(() => setIsLoading(false))
			}
		)
	}

	return {
		startTest,
		deleteTest,
		isLoading
	}
}
