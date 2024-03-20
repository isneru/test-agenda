import { api } from '@lib/api'
import { useState } from 'react'
import { inferRouterOutputs } from '@trpc/server'
import { AppRouter } from '@server/api/root'
import { useDateInputs, useDebounce } from '@lib/hooks'
import { getDate, isEveryFieldFilled } from '@lib/utils'

export type AbandonedProps = {
	order: inferRouterOutputs<AppRouter>['abandoned']['getAll'][number]
}

export const useAbandonedHelper = ({ order }: AbandonedProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [sentEmail, setSentEmail] = useState(order.sentEmail)
	const [sentLetter, setSentLetter] = useState(order.sentLetter)
	const [tracking, setTracking] = useState(order.letterTracking)
	const { mutate: handleDelete } = api.abandoned.delete.useMutation()
	const { refetch: refetchAbandoned } = api.abandoned.getAll.useQuery()
	const { mutate: handleChangeTracking } =
		api.abandoned.changeLetterTracking.useMutation()
	const { mutate: handleChangeSentEmail } =
		api.abandoned.toggleSentEmail.useMutation()
	const { mutate: handleChangeSentLetter } =
		api.abandoned.toggleSentLetter.useMutation()

	useDebounce(handleTrackingDebounce, [tracking], 2000)
	useDebounce(handleEmailDebounce, [sentEmail], 2000)
	useDebounce(handleLetterDebounce, [sentLetter], 2000)

	function handleTrackingDebounce() {
		if (order.letterTracking === tracking) return
		if (!order.sentLetter) return

		handleChangeTracking(
			{ orderId: order.id, value: tracking },
			{ onSettled: () => refetchAbandoned() }
		)
	}

	function handleEmailDebounce() {
		if (order.sentEmail === sentEmail) return

		handleChangeSentEmail(
			{ orderId: order.id, value: sentEmail },
			{ onSettled: () => refetchAbandoned() }
		)
	}

	function handleLetterDebounce() {
		if (order.sentLetter === sentLetter) return

		handleChangeSentLetter(
			{ orderId: order.id, value: sentLetter },
			{ onSettled: () => refetchAbandoned() }
		)
	}

	function deleteAbandoned() {
		setIsLoading(true)
		handleDelete(
			{ orderId: order.id },
			{
				onSettled: () => refetchAbandoned().then(() => setIsLoading(false))
			}
		)
	}

	return {
		deleteAbandoned,
		isLoading,
		isModalVisible,
		setIsModalVisible,
		tracking,
		setTracking,
		sentEmail,
		setSentEmail,
		sentLetter,
		setSentLetter
	}
}
