import {
	type PromptEmailModalProps,
	usePromptEmailModalHelper
} from './promptEmail.helper'
import { Input, Label } from '@components/ui'
import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'

export const PromptEmailModal = ({
	isModalVisible,
	setIsModalVisible,
	orderId,
	sendOnly = false
}: PromptEmailModalProps) => {
	const { email, sendResolvedEmail, setEmail, toggleModal, waitPickup } =
		usePromptEmailModalHelper({
			isModalVisible,
			setIsModalVisible,
			orderId,
			sendOnly
		})

	return (
		<Dialog.Root open={isModalVisible} onOpenChange={toggleModal}>
			<Dialog.Overlay className='fixed inset-0 z-10 bg-black/60 data-[state=closed]:animate-[overlay-hide_200ms] data-[state=open]:animate-[overlay-show_200ms]' />
			<Dialog.Content className='fixed left-1/2 z-20 top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg shadow bg-neutral-900 border border-foreground/40 py-6 px-8 data-[state=closed]:animate-[content-hide_200ms] data-[state=open]:animate-[content-show_200ms]'>
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
				<div
					className={clsx(
						'grid gap-6 w-full mt-6',
						sendOnly ? 'grid-cols-1' : 'grid-cols-2'
					)}>
					{!sendOnly && (
						<button
							onClick={waitPickup}
							className='flex w-full items-center justify-center rounded p-2 hover:underline'>
							Não enviar email
						</button>
					)}
					<button
						onClick={sendResolvedEmail}
						className='flex w-full items-center justify-center rounded bg-red-800 transition-colors hover:bg-cex p-2'>
						Confirmar
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}
