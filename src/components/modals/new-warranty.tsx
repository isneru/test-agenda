import { ObjHasFalsyValues } from '@lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { api } from '@utils/api'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

type NewWarrantyModalProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
}

export const NewWarrantyModal = ({
	isModalVisible,
	setIsModalVisible
}: NewWarrantyModalProps) => {
	const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()
	const { mutateAsync: createWarranty } = api.warranty.create.useMutation()

	const [warranty, setWarranty] = useState({
		orderId: '',
		customerId: '',
		description: ''
	})

	function toggleModal() {
		setWarranty({
			orderId: '',
			customerId: '',
			description: ''
		})
		setIsModalVisible(val => !val)
	}

	function handleChangeWarrantyInput(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setWarranty({
			...warranty,
			[e.target.id]:
				e.target.id === 'description'
					? e.target.value
					: e.target.value.toUpperCase()
		})
	}

	function handleCreateWarranty() {
		if (ObjHasFalsyValues(warranty)) {
			alert('Preenche todos os campos!')
			return
		}

		createWarranty(warranty, {
			onSuccess: toggleModal,
			onSettled: () => refetchWarranties()
		})
	}

	return (
		<Dialog.Root open={isModalVisible} onOpenChange={toggleModal}>
			<Dialog.Overlay className='fixed inset-0 z-10 bg-black/60 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]' />
			<Dialog.Content className='fixed left-1/2 z-20 top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg bg-red-950 p-8 shadow data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]'>
				<div className='grid grid-cols-2 items-center gap-2'>
					<label className='text-xl font-bold' htmlFor='orderId'>
						Nº de Ordem
					</label>
					<input
						className='rounded bg-red-500 px-2 text-lg font-medium outline-none'
						id='orderId'
						value={warranty.orderId}
						onChange={handleChangeWarrantyInput}
					/>
				</div>
				<div className='grid grid-cols-2 items-center gap-2'>
					<label className='text-xl font-bold' htmlFor='customerId'>
						Ficha de Cliente
					</label>
					<input
						className='rounded bg-red-500 px-2 text-lg font-medium outline-none'
						id='customerId'
						value={warranty.customerId}
						onChange={handleChangeWarrantyInput}
					/>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label className='text-xl font-bold' htmlFor='description'>
						Observações
					</label>
					<textarea
						className='rounded bg-red-500 px-2 text-lg font-medium outline-none resize-none h-32'
						id='description'
						value={warranty.description}
						onChange={handleChangeWarrantyInput}
					/>
				</div>
				<div className='grid mt-auto grid-cols-2 gap-6 w-full'>
					<Dialog.Close className='flex w-full items-center justify-center p-2 hover:underline'>
						Cancelar
					</Dialog.Close>
					<button
						onClick={handleCreateWarranty}
						className='flex w-full items-center justify-center rounded-lg bg-red-700 p-2'>
						Confirmar registo
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}
