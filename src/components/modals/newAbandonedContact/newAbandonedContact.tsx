import { Checkbox, Input, Label, Loading, Textarea } from '@components/ui'
import * as Dialog from '@radix-ui/react-dialog'
import {
	type NewAbandonedContactModalProps,
	useNewAbandonedContactModalHelper
} from './newAbandonedContact.helper'
import clsx from 'clsx'

export const NewAbandonedContactModal = ({
	isModalVisible,
	setIsModalVisible,
	order
}: NewAbandonedContactModalProps) => {
	const helper = useNewAbandonedContactModalHelper({
		isModalVisible,
		setIsModalVisible,
		order
	})

	return (
		<Dialog.Root open={isModalVisible} onOpenChange={helper.toggleModal}>
			<Dialog.Overlay className='fixed inset-0 z-[90] bg-black/60 data-[state=closed]:animate-[overlay-hide_200ms] data-[state=open]:animate-[overlay-show_200ms]' />
			<Dialog.Content className='fixed left-1/2 z-[100] top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg bg-neutral-900 border border-foreground/40 p-8 shadow data-[state=closed]:animate-[content-hide_200ms] data-[state=open]:animate-[content-show_200ms]'>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center gap-1'>
						<input
							autoComplete='off'
							className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm'
							id='day'
							ref={helper.dayRef}
							value={helper.date.day}
							onChange={helper.handleInputChange}
							placeholder='DD'
							maxLength={2}
						/>
						<span>/</span>
						<input
							autoComplete='off'
							className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm'
							id='month'
							ref={helper.monthRef}
							value={helper.date.month}
							onChange={helper.handleInputChange}
							placeholder='MM'
							maxLength={2}
						/>
						<span>/</span>
						<input
							autoComplete='off'
							className='h-10 w-20 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm'
							id='year'
							ref={helper.yearRef}
							value={helper.date.year}
							onChange={helper.handleInputChange}
							placeholder='AAAA'
							maxLength={4}
						/>
						<span className='mx-4'>-</span>
						<input
							autoComplete='off'
							className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm'
							id='hours'
							ref={helper.hoursRef}
							value={helper.time.hours}
							onChange={helper.handleInputChange}
							placeholder='hh'
							maxLength={2}
						/>
						<span>:</span>
						<input
							autoComplete='off'
							className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm'
							id='minutes'
							ref={helper.minutesRef}
							value={helper.time.minutes}
							onChange={helper.handleInputChange}
							placeholder='mm'
							maxLength={2}
						/>
					</div>
					<div className='flex items-center w-full gap-2 justify-between rounded border border-foreground/40 bg-background p-2'>
						<span className='text-lg font-bold'>Atendeu?</span>
						<Checkbox
							className='h-6 w-6'
							checked={helper.contactAnswered}
							onClick={() => helper.setContactAnswered(val => !val)}
						/>
					</div>
				</div>
				<div className='grid mt-6 grid-cols-2 gap-6 w-full'>
					<Dialog.Close className='flex w-full items-center justify-center p-2 hover:underline'>
						Cancelar
					</Dialog.Close>
					<button
						disabled={helper.isLoading}
						aria-disabled={helper.isLoading}
						onClick={helper.addContactAttempt}
						className='flex w-full items-center justify-center rounded bg-red-800 transition-colors hover:bg-cex p-2 disabled:bg-red-900 disabled:hover:bg-red-900 disabled:cursor-not-allowed'>
						<Loading
							width={24}
							height={24}
							className='text-center w-full'
							isLoading={helper.isLoading}>
							Confirmar registo
						</Loading>
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}
