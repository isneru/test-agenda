import { api } from '@lib/api'
import type { InputEvent } from '@lib/types'
import { isEveryFieldFilled } from '@lib/utils'
import { useState, type Dispatch, type SetStateAction } from 'react'

export type NewWarrantyModalProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
}

export const useNewWarrantyModalHelper = ({
	setIsModalVisible
}: NewWarrantyModalProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()
	const { mutate: handleCreate } = api.warranty.create.useMutation()
	const [warranty, setWarranty] = useState({
		orderId: '',
		customerId: '',
		description: ''
	})

	function toggleModal() {
		setWarranty({
			orderId: '',
			customerId: '',
			description: ''
		})
		setIsModalVisible(val => !val)
		setIsLoading(false)
	}

	function handleChangeWarrantyInput(e: InputEvent) {
		const { id, value } = e.target

		setWarranty({
			...warranty,
			[id]: id === 'description' ? value : value.toUpperCase()
		})
	}

	function createWarranty() {
		setIsLoading(true)
		const { description, ...nonOptionalWarrantyFields } = warranty

		if (!isEveryFieldFilled(nonOptionalWarrantyFields)) {
			alert('Preenche todos os campos!')
			return
		}

		handleCreate(warranty, {
			onSettled: () => refetchWarranties().then(toggleModal)
		})
	}

	return {
		toggleModal,
		warranty,
		handleChangeWarrantyInput,
		createWarranty,
		isLoading
	}
}
