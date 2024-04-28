import { type NewTestModalProps, useNewTestModalHelper } from './newTest.helper'
import { Input, Label, Loading, Textarea } from '@components/ui'
import { testValidTypes } from '@lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'

export const NewTestModal = ({
	isModalVisible,
	setIsModalVisible
}: NewTestModalProps) => {
	const helper = useNewTestModalHelper({
		isModalVisible,
		setIsModalVisible
	})

	return (
		<Dialog.Root open={isModalVisible} onOpenChange={helper.toggleModal}>
			<Dialog.Overlay className='fixed inset-0 z-[90] bg-black/60 data-[state=closed]:animate-[overlay-hide_150ms] data-[state=open]:animate-[overlay-show_150ms]' />
			<Dialog.Content className='fixed left-1/2 z-[100] top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg bg-neutral-900 border border-foreground/40 p-8 shadow data-[state=closed]:animate-[content-hide_150ms] data-[state=open]:animate-[content-show_150ms]'>
				<div className='grid grid-cols-2 items-center gap-2'>
					<Label value='Nº de Ordem' htmlFor='orderId' />
					<Input
						id='orderId'
						value={helper.test.orderId}
						onChange={helper.handleChangeTestInput}
					/>
				</div>
				<div className='grid grid-cols-2 items-center gap-2'>
					<Label value='Ficha de Cliente' htmlFor='customerId' />
					<Input
						id='customerId'
						value={helper.test.customerId}
						onChange={helper.handleChangeTestInput}
					/>
				</div>
				<div className='grid grid-cols-3 gap-2 rounded-md p-1 bg-background shadow w-full'>
					{testValidTypes.map(type => (
						<button
							onClick={() => helper.setTest({ ...helper.test, type })}
							className={clsx(
								'p-1 rounded-md transition-colors hover:bg-cex',
								type === helper.test.type && 'bg-red-800'
							)}
							key={type}>
							{type}
						</button>
					))}
				</div>
				{helper.test.type === 'Normal' && (
					<div className='flex flex-col items-center gap-1'>
						<span className='text-xl font-bold'>Hora Marcada</span>
						<div className='flex items-center gap-1'>
							<input
								autoComplete='off'
								className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm '
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
								className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm '
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
								className='h-10 w-20 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm '
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
								className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm '
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
								className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm '
								id='minutes'
								ref={helper.minutesRef}
								value={helper.time.minutes}
								onChange={helper.handleInputChange}
								placeholder='mm'
								maxLength={2}
							/>
						</div>
					</div>
				)}
				<div className='flex flex-col w-full gap-2'>
					<Label value='Observações' htmlFor='description' />
					<Textarea
						id='description'
						value={helper.test.description}
						onChange={helper.handleChangeTestInput}
					/>
				</div>
				<div className='grid grid-cols-2 mt-6 gap-6 w-full'>
					<Dialog.Close className='flex w-full items-center justify-center p-2 hover:underline'>
						Cancelar
					</Dialog.Close>
					<button
						disabled={helper.isLoading}
						aria-disabled={helper.isLoading}
						onClick={helper.createTest}
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
