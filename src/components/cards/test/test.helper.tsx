import type { Test } from '@prisma/client'
import { api } from '@lib/api'
import { useState } from 'react'

export type TestProps = {
	order: Test
}

export const useTestHelper = ({ order }: TestProps) => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { mutate: handleDelete } = api.test.delete.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { mutate: handleStartTest } = api.test.startTest.useMutation()

	function startTest() {
		handleStartTest({ orderId: order.id }, { onSettled: () => refetchTests() })
	}

	function deleteTest() {
		order.type === 'Normal'
			? setIsModalVisible(true)
			: handleDelete({ orderId: order.id }, { onSettled: () => refetchTests() })
	}

	return {
		startTest,
		setIsModalVisible,
		deleteTest,
		isModalVisible
	}
}
