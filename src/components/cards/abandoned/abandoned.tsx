import { CustomBarcode } from '@components/barcodes'
import { AbandonedProps, useAbandonedHelper } from './abandoned.helper'
import { Checkbox, Input, Label, Loading } from '@components/ui'
import { addFourteenDays, addThirtyDays, formatDate } from '@lib/utils'
import { NewAbandonedContactModal } from '@components/modals/newAbandonedContact'
import { PlusIcon } from '@radix-ui/react-icons'

export const Abandoned = ({ order }: AbandonedProps) => {
	const { deleteAbandoned, isLoading, ...helper } = useAbandonedHelper({
		order
	})

	return (
		<div className='flex w-full flex-col gap-5 rounded-lg border bg-neutral-900 p-3 border-foreground/20'>
			<div className='grid grid-cols-2 gap-4'>
				<CustomBarcode value={order.id}>Nº de Ordem</CustomBarcode>
				<CustomBarcode value={order.customerId}>Ficha de Cliente</CustomBarcode>
			</div>
			<div className='grid grid-cols-3 gap-4 bg-background rounded p-2 shadow'>
				<div className='flex flex-col items-center justify-center'>
					<span className='text-xl font-bold'>Data de Entrada</span>
					<span className='underline decoration-cex decoration-wavy'>
						{formatDate(order.orderDate, false)}
					</span>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<span className='text-xl font-bold'>Enviar email/carta</span>
					<span className='underline decoration-cex decoration-wavy'>
						{formatDate(addFourteenDays(order.orderDate), false)}
					</span>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<span className='text-xl font-bold'>Date do Ajuste</span>
					<span className='underline decoration-cex decoration-wavy'>
						{formatDate(addThirtyDays(order.orderDate), false)}
					</span>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-12'>
				<div className='flex flex-col gap-1 items-center w-full'>
					<span className='text-xl font-bold inline-flex gap-3 items-center'>
						Tentativas de Contacto &#40;{order.contacts.length}&#41;
						<button
							title='Adicionar tentativa de contacto'
							onClick={() => helper.setIsModalVisible(true)}
							className='outline-none text-white/70 hover:text-white flex items-center justify-center border bg-background hover:bg-[#060606] border-foreground/40 rounded transition-colors p-1'>
							<PlusIcon />
						</button>
					</span>
					<div className='flex items-center gap-2 overflow-x-scroll w-full max-w-full'>
						{order.contacts.map(contact => (
							<div
								key={contact.id}
								className='bg-background rounded py-1 px-2 border border-foreground/40 flex flex-col items-center gap-1'>
								<span className='text-xl font-bold whitespace-nowrap'>
									{formatDate(contact.time)}
								</span>
								<span>{contact.answered ? 'Atendeu' : 'Não atendeu'}</span>
							</div>
						))}
					</div>
				</div>
				<div className='flex flex-col gap-1 items-center'>
					<div className='flex justify-between items-center w-full'>
						<span
							onClick={() => helper.setSentEmail(val => !val)}
							className='text-xl font-bold w-full cursor-pointer'>
							Email enviado
							<span className='text-sm font-normal'>(Apoio ao Cliente)</span>
						</span>
						<Checkbox
							onClick={() => helper.setSentEmail(val => !val)}
							className='ml-auto'
							checked={helper.sentEmail}
						/>
					</div>
					<div className='flex justify-between items-center w-full'>
						<span
							onClick={() => helper.setSentLetter(val => !val)}
							className='text-xl font-bold w-full cursor-pointer'>
							Carta enviada
						</span>
						<Checkbox
							onClick={() => helper.setSentLetter(val => !val)}
							className='ml-auto'
							checked={helper.sentLetter}
						/>
					</div>
					{helper.sentLetter && (
						<div className='flex justify-between items-center w-full'>
							<Label
								value='Tracking'
								className='w-full'
								htmlFor={`tracking-${order.id}`}
							/>
							<Input
								onChange={e => helper.setTracking(e.target.value.toUpperCase())}
								id={`tracking-${order.id}`}
								value={helper.tracking}
								disabled={!helper.sentLetter}
								className='ml-auto'
							/>
						</div>
					)}
				</div>
			</div>
			<div className='flex flex-col gap-2 mt-4'>
				<p className='text-xl font-bold text-center'>
					Artigos &#40;{order.products.length}&#41;
				</p>
				<div className='w-full flex flex-col gap-4'>
					{order.products.map((product, i) => (
						<div
							key={i}
							className='bg-background rounded border border-foreground/40 w-full flex flex-col px-2 py-4'>
							<div className='grid grid-cols-3'>
								<div className='flex flex-col items-center justify-center'>
									<strong className='text-xl font-bold'>Box ID</strong>
									<span>{product.boxId}</span>
								</div>
								<div className='flex flex-col items-center justify-center'>
									<strong className='text-xl font-bold'>Passou?</strong>
									<span>{product.passed ? 'Sim' : `Não`}</span>
								</div>
								<div className='flex flex-col items-center justify-center'>
									<strong className='text-xl font-bold'>Serial</strong>
									<span>{!!product.serial ? product.serial : 'N/A'}</span>
								</div>
							</div>
							{!!product.defect && (
								<>
									<div className='relative flex py-5 items-center'>
										<div className='flex-grow border-t border-foreground'></div>
										<span className='flex-shrink mx-4 text-xl font-bold text-white'>
											Descrição do Problema
										</span>
										<div className='flex-grow border-t border-foreground'></div>
									</div>
									<span className='mx-auto px-5'>{product.defect}</span>
								</>
							)}
						</div>
					))}
				</div>
			</div>
			<button
				disabled={isLoading}
				aria-disabled={isLoading}
				onClick={deleteAbandoned}
				className='rounded bg-red-800 p-2 transition-colors hover:bg-cex text-center disabled:bg-red-900 disabled:hover:bg-red-900 disabled:cursor-not-allowed'>
				<Loading
					width={24}
					height={24}
					className='text-center w-full'
					isLoading={isLoading}>
					Marcar como resolvido
				</Loading>
			</button>
			<NewAbandonedContactModal
				isModalVisible={helper.isModalVisible}
				setIsModalVisible={helper.setIsModalVisible}
				order={order}
			/>
		</div>
	)
}
