import { Input, Label, Textarea } from '@components/ui'
import * as Dialog from '@radix-ui/react-dialog'
import {
	type NewWarrantyModalProps,
	useNewWarrantyModalHelper
} from './newWarranty.helper'

export const NewWarrantyModal = ({
	isModalVisible,
	setIsModalVisible
}: NewWarrantyModalProps) => {
	const helper = useNewWarrantyModalHelper({
		isModalVisible,
		setIsModalVisible
	})

	return (
		<Dialog.Root open={isModalVisible} onOpenChange={helper.toggleModal}>
			<Dialog.Overlay className='fixed inset-0 z-10 bg-black/60 data-[state=closed]:animate-[overlay-hide_200ms] data-[state=open]:animate-[overlay-show_200ms]' />
			<Dialog.Content className='fixed left-1/2 z-20 top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg bg-neutral-900 border border-foreground/40 p-8 shadow data-[state=closed]:animate-[content-hide_200ms] data-[state=open]:animate-[content-show_200ms]'>
				<div className='grid grid-cols-2 items-center gap-2'>
					<Label value='Nº de Ordem' htmlFor='orderId' />
					<Input
						id='orderId'
						value={helper.warranty.orderId}
						onChange={helper.handleChangeWarrantyInput}
					/>
				</div>
				<div className='grid grid-cols-2 items-center gap-2'>
					<Label
						value='Ficha de Cliente'
						className='text-xl font-bold'
						htmlFor='customerId'
					/>
					<Input
						id='customerId'
						value={helper.warranty.customerId}
						onChange={helper.handleChangeWarrantyInput}
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<Label value='Observações' htmlFor='description' />
					<Textarea
						id='description'
						value={helper.warranty.description}
						onChange={helper.handleChangeWarrantyInput}
					/>
				</div>
				<div className='grid mt-6 grid-cols-2 gap-6 w-full'>
					<Dialog.Close className='flex w-full items-center justify-center p-2 hover:underline'>
						Cancelar
					</Dialog.Close>
					<button
						onClick={helper.createWarranty}
						className='flex w-full items-center justify-center rounded bg-red-800 transition-colors hover:bg-cex p-2'>
						Confirmar registo
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}
