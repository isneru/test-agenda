import { api } from '@lib/api'
import { useDateInputs } from '@lib/hooks'
import type { InputEvent } from '@lib/types'
import { getDate, isEveryFieldFilled } from '@lib/utils'
import { useState, Dispatch, SetStateAction } from 'react'

export type NewTestAbandonedProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
}

export const useNewAbandonedModalHelper = ({
	setIsModalVisible
}: NewTestAbandonedProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const { refetch: refetchAbandoned } = api.abandoned.getAll.useQuery()
	const { mutate: handleCreate } = api.abandoned.create.useMutation()
	const [abandoned, setAbandoned] = useState({
		orderId: '',
		customerId: '',
		products: [
			{
				boxId: '',
				passed: true,
				serial: '',
				defect: ''
			}
		]
	})
	const {
		date,
		dayRef,
		handleInputChange,
		hoursRef,
		minutesRef,
		monthRef,
		time,
		yearRef,
		setDate,
		setTime
	} = useDateInputs()

	function toggleModal() {
		setIsModalVisible(val => !val)
		setDate({ day: '', month: '', year: '' })
		setTime({ hours: '', minutes: '' })
		setAbandoned({
			orderId: '',
			customerId: '',
			products: [
				{
					boxId: '',
					passed: true,
					serial: '',
					defect: ''
				}
			]
		})
		setIsLoading(false)
	}

	function handleChangeAbandonedInput(e: InputEvent) {
		const { id, value } = e.target

		setAbandoned({
			...abandoned,
			[id]: id === 'defect' ? value : value.toUpperCase()
		})
	}

	function deleteProduct(index: number) {
		return () => {
			setAbandoned({
				...abandoned,
				products: abandoned.products.filter((_, i) => i !== index)
			})
		}
	}

	function handleChangeAbandonedProductInput(index: number) {
		return (e: InputEvent) => {
			const { name, value } = e.target
			setAbandoned({
				...abandoned,
				products: abandoned.products.map((product, i) =>
					i === index
						? {
								...product,
								[name]: name === 'defect' ? value : value.toUpperCase()
							}
						: product
				)
			})
		}
	}

	function handleChangeProductPassed(index: number, choice: boolean) {
		return () => {
			setAbandoned({
				...abandoned,
				products: abandoned.products.map((product, i) =>
					i === index
						? {
								...product,
								passed: choice
							}
						: product
				)
			})
		}
	}

	function handleAddProduct() {
		setAbandoned(val => ({
			...val,
			products: [
				...val.products,
				{
					boxId: '',
					passed: true,
					serial: '',
					defect: ''
				}
			]
		}))
	}

	function createAbandoned() {
		const { products, ...nonOptionalFields } = abandoned

		const valuesToCheck = [date, nonOptionalFields]

		if (!isEveryFieldFilled(...valuesToCheck)) {
			alert('Preenche todos os campos')
			return
		}

		if (products.some(product => !product.boxId)) {
			alert('Preenche todos os campos')
			return
		}

		setIsLoading(true)

		handleCreate(
			{
				...abandoned,
				products,
				orderDate: getDate({ date, time })
			},
			{
				onSettled: () => refetchAbandoned().then(toggleModal)
			}
		)
	}

	return {
		toggleModal,
		abandoned,
		setAbandoned,
		dayRef,
		date,
		handleInputChange,
		monthRef,
		yearRef,
		hoursRef,
		time,
		minutesRef,
		createAbandoned,
		handleChangeAbandonedInput,
		handleChangeAbandonedProductInput,
		handleChangeProductPassed,
		handleAddProduct,
		deleteProduct,
		isLoading
	}
}
