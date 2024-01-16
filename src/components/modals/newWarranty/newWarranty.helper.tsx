import { api } from '@lib/api'
import { InputEvent } from '@lib/types'
import { useState, Dispatch, SetStateAction } from 'react'

export type NewWarrantyModalProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
}

export const useNewWarrantyModalHelper = ({
	setIsModalVisible
}: NewWarrantyModalProps) => {
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
	}

	function handleChangeWarrantyInput(e: InputEvent) {
		const { id, value } = e.target

		setWarranty({
			...warranty,
			[id]: id === 'description' ? value : value.toUpperCase()
		})
	}

	function createWarranty() {
		if (!warranty.customerId || !warranty.orderId) {
			alert('Preenche todos os campos!')
			return
		}

		handleCreate(warranty, {
			onSuccess: () => {
				refetchWarranties()
				toggleModal()
			}
		})
	}

	return { toggleModal, warranty, handleChangeWarrantyInput, createWarranty }
}
