import { api } from '@lib/api'
import { useDateInputs } from '@lib/hooks'
import { InputEvent } from '@lib/types'
import { getDate } from '@lib/utils'
import { useState, useRef, Dispatch, SetStateAction } from 'react'

export type NewTestModalProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
}

export const useNewTestModalHelper = ({
	setIsModalVisible
}: NewTestModalProps) => {
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { mutate: handleCreate } = api.test.create.useMutation()
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

	const [test, setTest] = useState({
		orderId: '',
		customerId: '',
		type: 'Normal',
		description: ''
	})

	function toggleModal() {
		setIsModalVisible(val => !val)
		setDate({ day: '', month: '', year: '' })
		setTime({ hours: '', minutes: '' })
		setTest({
			orderId: '',
			customerId: '',
			type: 'Normal',
			description: ''
		})
	}

	function handleChangeTestInput(e: InputEvent) {
		const { id, value } = e.target

		setTest({
			...test,
			[id]: id === 'description' ? value : value.toUpperCase()
		})
	}

	function createTest() {
		if (
			test.type === 'Normal' &&
			(!date.year ||
				!date.month ||
				!date.day ||
				!time.hours ||
				!time.minutes ||
				!test.type ||
				!test.orderId ||
				!test.customerId)
		) {
			alert('Preencha todos os campos')
			return
		}

		if (
			test.type !== 'Normal' &&
			(!test.type || !test.orderId || !test.customerId)
		) {
			alert('Preencha todos os campos')
			return
		}

		handleCreate(
			{
				...test,
				scheduledFor:
					test.type === 'Normal' ? getDate({ date, time }) : undefined
			},
			{
				onSuccess: () => {
					toggleModal()
					refetchTests()
				}
			}
		)
	}

	return {
		toggleModal,
		handleChangeTestInput,
		test,
		setTest,
		dayRef,
		date,
		handleInputChange,
		monthRef,
		yearRef,
		hoursRef,
		time,
		minutesRef,
		createTest
	}
}
