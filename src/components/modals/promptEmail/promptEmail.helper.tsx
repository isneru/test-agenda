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
	const [email, setEmail] = useState('')
	const { mutate: handleSendResolved } = api.email.sendResolved.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { mutate: handleDelete } = api.test.delete.useMutation()

	function toggleModal() {
		setEmail('')
		setIsModalVisible(val => !val)
	}

	function deleteTest() {
		handleDelete(
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
				onSuccess: () => deleteTest(),
				onError: val =>
					alert(
						val.data?.zodError?.fieldErrors?.email?.[0] ?? 'Erro Desconhecido'
					)
			}
		)
	}

	return { toggleModal, email, setEmail, sendResolvedEmail, deleteTest }
}
