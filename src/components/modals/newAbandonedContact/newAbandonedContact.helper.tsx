import { api } from '@lib/api'
import { useDateInputs } from '@lib/hooks'
import type { InputEvent } from '@lib/types'
import { getDate, isEveryFieldFilled } from '@lib/utils'
import { AppRouter } from '@server/api/root'
import { inferRouterOutputs } from '@trpc/server'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { set } from 'zod'

export type NewAbandonedContactModalProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
	order: inferRouterOutputs<AppRouter>['abandoned']['getAll'][number]
}

export const useNewAbandonedContactModalHelper = ({
	setIsModalVisible,
	order
}: NewAbandonedContactModalProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [contactAnswered, setContactAnswered] = useState(false)
	const { refetch: refetchAbandoned } = api.abandoned.getAll.useQuery()
	const { mutate: handleAddContact } = api.abandoned.addContact.useMutation()

	const {
		date,
		dayRef,
		handleInputChange,
		hoursRef,
		minutesRef,
		monthRef,
		setDate,
		setTime,
		time,
		yearRef
	} = useDateInputs()

	function toggleModal() {
		setDate({ day: '', month: '', year: '' })
		setTime({ hours: '', minutes: '' })
		setIsLoading(false)
		setIsModalVisible(false)
	}

	function addContactAttempt() {
		const fieldsToVerify = [date, time]
		if (!isEveryFieldFilled(...fieldsToVerify)) {
			alert('Preenche todos os campos')
			return
		}

		setIsLoading(true)

		handleAddContact(
			{
				orderId: order.id,
				answered: contactAnswered,
				time: getDate({ date, time })
			},
			{
				onSettled: () => refetchAbandoned().then(toggleModal)
			}
		)
	}

	return {
		toggleModal,
		isLoading,
		date,
		dayRef,
		handleInputChange,
		contactAnswered,
		setContactAnswered,
		hoursRef,
		minutesRef,
		monthRef,
		setDate,
		setTime,
		time,
		addContactAttempt,
		yearRef
	}
}
