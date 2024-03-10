import { api } from '@lib/api'
import { type Dispatch, type SetStateAction, useState } from 'react'

export type PromptEmailModalProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
	orderId: string
}

export const usePromptEmailModalHelper = ({
	setIsModalVisible,
	orderId
}: PromptEmailModalProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [email, setEmail] = useState('')
	const { mutate: handleSendResolved } = api.email.sendResolved.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { mutate: handleDelete } = api.test.delete.useMutation()

	function toggleModal() {
		setEmail('')
		setIsModalVisible(val => !val)
		setIsLoading(false)
	}

	function deleteTest() {
		setIsLoading(true)
		handleDelete(
			{ orderId },
			{
				onSettled: () => {
					refetchTests().then(toggleModal)
				}
			}
		)
	}

	function sendResolvedEmail() {
		if (!email) {
			alert('Preenche o campo!')
			return
		}
		setIsLoading(true)

		handleSendResolved(
			{ email, orderId },
			{
				onSettled: () => deleteTest(),
				onError: val =>
					alert(
						val.data?.zodError?.fieldErrors?.email?.[0] ?? 'Erro Desconhecido'
					)
			}
		)
	}

	return {
		toggleModal,
		email,
		setEmail,
		sendResolvedEmail,
		deleteTest,
		isLoading
	}
}
