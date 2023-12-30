import { Input, Label } from '@components/ui'
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
				onSuccess: () => markAsResolved(),
				onError: val =>
					alert(
						val.data?.zodError?.fieldErrors?.email?.[0] ?? 'Erro Desconhecido'
					)
			}
		)
	}

	return (
		<Dialog.Root open={isModalVisible} onOpenChange={toggleModal}>
			<Dialog.Overlay className='fixed inset-0 z-10 bg-black/60 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]' />
			<Dialog.Content className='fixed left-1/2 z-20 top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg shadow bg-neutral-900 border border-foreground/40 py-6 px-8 data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]'>
				<div className='flex flex-col gap-1 w-full'>
					<Label
						value='Email do cliente'
						className='text-xl font-bold'
						htmlFor='customer-email'
					/>
					<Input
						className='rounded p-2 text-lg font-medium outline-none w-full'
						id='customer-email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className='grid grid-cols-2 gap-6 w-full mt-6'>
					<button
						onClick={markAsResolved}
						className='flex w-full items-center justify-center rounded p-2 hover:underline'>
						Não enviar email
					</button>
					<button
						onClick={handleSendTestResolvedEmail}
						className='flex w-full items-center justify-center rounded bg-red-800 transition-colors hover:bg-cex p-2'>
						Confirmar
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}
