import {
	addThirtyDays,
	formatDate,
	splitStringWithURL,
	warrantyValidStatuses
} from '@lib/utils'
import clsx from 'clsx'
import { Warranty } from '@prisma/client'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Label, Textarea } from '@components/ui'
import Barcode from 'react-jsbarcode'
import colors from 'tailwindcss/colors'

const mockOrder: Warranty = {
	id: 'Demo',
	createdAt: new Date('2999-12-20T00:00:00.000Z'),
	customerId: 'PTMSPG440',
	status: 'Em Análise',
	description:
		'Links compostos sao encurtados e clicaveis! (tal como este campo) https://www.youtube.com/watch?v=xvFZjo5PgG0',
	warrantyRequestId: '',
	updatedAt: new Date('2999-12-20T00:00:00.000Z'),
	userId: 'neruspins'
}

export const WarrantyDemo = () => {
	const [order, setOrder] = useState<Warranty>(mockOrder)
	const [isEditing, setIsEditing] = useState(false)
	const ref = useRef<HTMLTextAreaElement>(null)
	const splitInputs = splitStringWithURL(order.description)

	useEffect(() => {
		isEditing && ref.current?.focus()
	}, [isEditing])

	function deleteWarranty() {
		return
	}

	function changeWarrantyStatus(status: string) {
		setOrder({ ...order, status })
	}

	return (
		<div className='flex w-[400px] flex-col gap-5 rounded-lg bg-neutral-900 border border-foreground/20 p-3'>
			<div className='flex flex-col items-center justify-between w-full'>
				<p className='text-2xl font-bold m-0'>{order.id}</p>
				<div className='bg-background w-full rounded shadow barcode-print'>
					<Barcode
						className='max-w-[376px] mx-auto w-full'
						value={order.id}
						options={{
							background: colors.neutral[950],
							lineColor: colors.neutral[50],
							displayValue: false,
							height: 40
						}}
					/>
				</div>
			</div>
			<div className='flex items-center justify-between'>
				<span className='text-xl font-bold'>Prazo de Resolução</span>
				<span className='underline decoration-cex decoration-wavy'>
					{formatDate(addThirtyDays(order.createdAt), false)}
				</span>
			</div>
			<div className='grid grid-cols-3 gap-2 rounded-md p-1 bg-background shadow relative isolate'>
				{warrantyValidStatuses.map(status => (
					<button
						onClick={() => changeWarrantyStatus(status)}
						className={clsx(
							'p-1 rounded-md transition-colors hover:bg-cex',
							status === order.status && 'bg-red-800'
						)}
						key={status}>
						{status}
					</button>
				))}
			</div>
			<div className='flex items-center justify-between w-full'>
				<Label
					value='Nº de Warranty Request'
					htmlFor={`warrantyRequestId-${order.id}`}
				/>
				<input
					autoComplete='off'
					disabled={order.status !== 'Substituir'}
					value={
						order.status === 'Substituir'
							? order.warrantyRequestId ?? ''
							: 'N/A'
					}
					onChange={e =>
						setOrder({ ...order, warrantyRequestId: e.target.value })
					}
					className={clsx(
						'rounded px-2 text-lg font-medium outline-none w-[9ch] text-center',
						order.status === 'Substituir'
							? 'bg-background shadow-[0px_0px_0px_1px_rgba(82,82,82,0.4)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex'
							: 'bg-cex shadow'
					)}
					type='text'
					name={`warrantyRequestId-${order.id}`}
					id={`warrantyRequestId-${order.id}`}
				/>
			</div>
			<div className='flex w-full flex-col items-center'>
				<p className='text-2xl font-bold m-0'>Ficha de Cliente</p>
				<div className='bg-background w-full rounded shadow barcode-print'>
					<Barcode
						className='max-w-[376px] mx-auto w-full'
						value={order.customerId}
						options={{
							background: colors.neutral[950],
							lineColor: colors.neutral[50],
							displayValue: false,
							height: 40
						}}
					/>
				</div>
				<span>{order.customerId}</span>
			</div>
			<div className='flex w-full flex-col gap-1 mt-auto'>
				<Label value='Observações' htmlFor={`description-${order.id}`} />
				{isEditing ? (
					<Textarea
						spellCheck={false}
						value={order.description}
						ref={ref}
						id={`description-${order.id}`}
						onBlur={() => setIsEditing(false)}
						onChange={e => setOrder({ ...order, description: e.target.value })}
						onFocus={e => (e.target.selectionStart = e.target.value.length)}
					/>
				) : (
					<div
						onClick={() => setIsEditing(true)}
						className='cursor-default rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex px-2 text-lg font-medium outline-none resize-none h-32'>
						{splitInputs.map((part, index) => (
							<Fragment key={index}>
								{part.type === 'text' ? (
									<span>{part.text}</span>
								) : (
									<a
										className='inline underline decoration-cex underline-offset-1 text-red-500 h-min'
										href={part.url}
										target='_blank'
										rel='noopener noreferrer'>
										{part.text}
									</a>
								)}
							</Fragment>
						))}
					</div>
				)}
			</div>
			<button
				onClick={deleteWarranty}
				className='rounded bg-red-800 p-2 transition-colors hover:bg-cex'>
				Marcar como resolvido
			</button>
		</div>
	)
}
