import {
	useNewAbandonedModalHelper,
	type NewTestAbandonedProps
} from './newAbandoned.helper'
import { Input, Label } from '@components/ui'
import * as Dialog from '@radix-ui/react-dialog'
import { TrashIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'

export const NewAbandonedModalDemo = ({
	isModalVisible,
	setIsModalVisible
}: NewTestAbandonedProps) => {
	const helper = useNewAbandonedModalHelper({
		isModalVisible,
		setIsModalVisible
	})

	return (
		<Dialog.Root open={isModalVisible} onOpenChange={helper.toggleModal}>
			<Dialog.Overlay className='fixed inset-0 z-10 bg-black/60 data-[state=closed]:animate-[overlay-hide_150ms] data-[state=open]:animate-[overlay-show_150ms]' />
			<Dialog.Content className='fixed max-h-[90vh] left-1/2 z-20 top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg bg-neutral-900 border border-foreground/40 p-8 shadow data-[state=closed]:animate-[content-hide_150ms] data-[state=open]:animate-[content-show_150ms]'>
				<div className='grid grid-cols-2 items-center gap-2'>
					<Label value='Nº de Ordem' htmlFor='orderId' />
					<Input
						id='orderId'
						value={helper.abandoned.orderId}
						onChange={helper.handleChangeAbandonedInput}
					/>
				</div>
				<div className='grid grid-cols-2 items-center gap-2'>
					<Label value='Ficha de Cliente' htmlFor='customerId' />
					<Input
						id='customerId'
						value={helper.abandoned.customerId}
						onChange={helper.handleChangeAbandonedInput}
					/>
				</div>
				<div className='flex flex-col items-center gap-1'>
					<span className='text-xl font-bold'>Data de Entrada</span>
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
					</div>
				</div>
				<div className='flex flex-col w-full gap-2 overflow-y-scroll mt-2'>
					<span className='text-xl font-bold w-full text-center'>Artigos</span>
					{helper.abandoned.products.map((product, i) => (
						<div
							key={i}
							className='flex flex-col w-full gap-2 bg-background border border-foreground/40 rounded p-2'>
							<span className='text-xl font-bold w-full flex items-center justify-between'>
								Artigo N&ordm;&nbsp;{i + 1}
								<button
									disabled={helper.abandoned.products.length <= 1}
									title={
										helper.abandoned.products.length <= 1
											? 'Abandonado Sem Artigos? 🤔'
											: 'Remover Artigo'
									}
									onClick={helper.deleteProduct(i)}
									className='bg-foreground/40 h-7 w-7 flex items-center justify-center rounded border border-foreground/40 hover:bg-cex/40 hover:border-cex/40 transition-colors disabled:cursor-not-allowed disabled:hover:bg-foreground/40 disabled:hover:border-foreground/40'>
									<TrashIcon width={18} height={18} />
								</button>
							</span>
							<div className='grid grid-cols-2 items-center gap-2'>
								<Label value='Box ID' htmlFor={`boxId-${i}`} />
								<Input
									id={`boxId-${i}`}
									name='boxId'
									value={product.boxId}
									className='!bg-[#060606]'
									onChange={helper.handleChangeAbandonedProductInput(i)}
								/>
							</div>
							<div className={clsx('grid grid-cols-2 items-center gap-2')}>
								<label
									className='text-xl font-bold cursor-pointer'
									htmlFor={`serial-${i}`}>
									Serial&nbsp;
									<span className='text-sm font-normal'>
										&#40;opcional&#41;
									</span>
								</label>
								<Input
									id={`serial-${i}`}
									name='serial'
									value={product.serial}
									className='!bg-[#060606]'
									onChange={helper.handleChangeAbandonedProductInput(i)}
								/>
							</div>
							<div className={clsx('grid grid-cols-2 items-center gap-2')}>
								<Label
									className='select-none'
									value='Passou?'
									htmlFor={`passed-${i}`}
								/>
								<div className='grid grid-cols-2 gap-2 rounded-md p-1 bg-[#060606] shadow w-full'>
									{[true, false].map(choice => (
										<button
											onClick={helper.handleChangeProductPassed(i, choice)}
											className={clsx(
												'px-1 py-0.5 rounded-md transition-colors hover:bg-cex',
												product.passed === choice && 'bg-red-800'
											)}
											key={choice ? 'Sim' : 'Não'}>
											{choice ? 'Sim' : 'Não'}
										</button>
									))}
								</div>
							</div>
							{!product.passed && (
								<div className='grid grid-cols-2 items-center gap-2'>
									<Label value='Defeito' htmlFor={`defect-${i}`} />
									<Input
										id={`defect-${i}`}
										className='!bg-[#060606]'
										name='defect'
										value={product.defect}
										onChange={helper.handleChangeAbandonedProductInput(i)}
									/>
								</div>
							)}
						</div>
					))}
					<button
						className='outline-none text-white/70 hover:text-white flex items-center justify-center border bg-background hover:bg-[#060606] border-foreground/40 rounded transition-colors py-1'
						onClick={helper.handleAddProduct}>
						Adicionar Artigo
					</button>
				</div>
				<div className='grid grid-cols-2 mt-6 gap-6 w-full'>
					<Dialog.Close className='flex w-full items-center justify-center p-2 hover:underline'>
						Cancelar
					</Dialog.Close>
					<button
						onClick={() => setIsModalVisible(false)}
						className='flex w-full items-center justify-center rounded bg-red-800 transition-colors hover:bg-cex p-2 disabled:bg-red-900 disabled:hover:bg-red-900 disabled:cursor-not-allowed'>
						Confirmar registo
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}
