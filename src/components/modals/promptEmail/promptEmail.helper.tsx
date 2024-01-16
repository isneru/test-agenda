import { api } from '@lib/api'
import { type Dispatch, type SetStateAction, useState } from 'react'

export type PromptEmailModalProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
	orderId: string
	sendOnly?: boolean
}

export const usePromptEmailModalHelper = ({
	setIsModalVisible,
	orderId,
	sendOnly
}: PromptEmailModalProps) => {
	const [email, setEmail] = useState('')
	const { mutate: handleSendResolved } = api.email.sendResolved.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { mutate: handleWaitPickup } = api.test.waitPickup.useMutation()

	function toggleModal() {
		setEmail('')
		setIsModalVisible(val => !val)
	}

	function waitPickup() {
		handleWaitPickup(
			{ orderId },
			{
				onSettled: () => {
					refetchTests()
					toggleModal()
				}
			}
		)
	}

	function sendResolvedEmail() {
		if (!email) {
			alert('Preenche o campo!')
			return
		}

		handleSendResolved(
			{ email, orderId },
			{
				onSuccess: () => (sendOnly ? toggleModal() : waitPickup()),
				onError: val =>
					alert(
						val.data?.zodError?.fieldErrors?.email?.[0] ?? 'Erro Desconhecido'
					)
			}
		)
	}

	return { toggleModal, email, setEmail, waitPickup, sendResolvedEmail }
}
