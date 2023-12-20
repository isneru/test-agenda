import { ObjHasFalsyValues } from '@lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { api } from '@utils/api'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

type PromptEmailModalProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
	orderId: string
}

export const PromptEmailModal = ({
	isModalVisible,
	setIsModalVisible,
	orderId
}: PromptEmailModalProps) => {
	const [email, setEmail] = useState('')
	const { mutate: sendEmail } = api.email.sendResolvedTest.useMutation()
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { mutate: resolveTest } = api.test.markAsResolved.useMutation()

	function toggleModal() {
		setEmail('')
		setIsModalVisible(val => !val)
	}

	function markAsResolved() {
		resolveTest(
			{ orderId },
			{
				onSettled: () => {
					refetchTests()
					toggleModal()
				}
			}
		)
	}

	function handleSendTestResolvedEmail() {
		if (ObjHasFalsyValues({ email })) {
			alert('Preenche o campo!')
			return
		}

		sendEmail(
			{ email, orderId },
			{
				onSettled: () => markAsResolved(),
				onError: val =>
					alert(
						val.data?.zodError?.fieldErrors?.email?.[0] ?? 'Erro Desconhecido'
					)
			}
		)
	}

	return (
		<Dialog.Root open={isModalVisible} onOpenChange={toggleModal}>
			<Dialog.Overlay className='fixed inset-0 bg-black/60' />
			<Dialog.Content className='fixed left-1/2 top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-xl bg-red-950 py-6 px-8'>
				<div className='flex flex-col gap-1 w-full'>
					<label className='text-xl font-bold' htmlFor='customer-email'>
						Email do cliente
					</label>
					<input
						className='rounded bg-red-500 p-2 text-lg font-medium outline-none w-full'
						id='customer-email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className='grid grid-cols-2 gap-4 w-full mt-2'>
					<button
						onClick={markAsResolved}
						className='flex w-full items-center justify-center rounded-xl bg-red-900 p-2'>
						Continuar sem email
					</button>
					<button
						onClick={handleSendTestResolvedEmail}
						className='flex w-full items-center justify-center rounded-xl bg-red-900 p-2'>
						Enviar email
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}
