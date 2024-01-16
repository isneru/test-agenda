import { api } from '@lib/api'
import { useDateInputs } from '@lib/hooks'
import type { InputEvent } from '@lib/types'
import { getDate, isEveryFieldFilled } from '@lib/utils'
import { useState, Dispatch, SetStateAction } from 'react'

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
		const { description, ...nonOptionalTestFields } = test

		const valuesToCheck =
			test.type === 'Normal'
				? [date, time, nonOptionalTestFields]
				: [nonOptionalTestFields]

		if (!isEveryFieldFilled(...valuesToCheck)) {
			alert('Preenche todos os campos')
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
