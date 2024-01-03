import { Input, Label, Textarea } from '@components/ui'
import { getDate, testValidTypes } from '@lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { api } from '@utils/api'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

type NewTestModalProps = {
	isModalVisible: boolean
	setIsModalVisible: Dispatch<SetStateAction<boolean>>
}

export const NewTestModal = ({
	isModalVisible,
	setIsModalVisible
}: NewTestModalProps) => {
	const { refetch: refetchTests } = api.test.getAll.useQuery()
	const { mutate: handleCreate } = api.test.create.useMutation()

	const [date, setDate] = useState({ day: '', month: '', year: '' })
	const [time, setTime] = useState({ hours: '', minutes: '' })
	const [test, setTest] = useState({
		orderId: '',
		customerId: '',
		type: 'Normal',
		description: ''
	})

	const dayRef = useRef<HTMLInputElement>(null)
	const monthRef = useRef<HTMLInputElement>(null)
	const yearRef = useRef<HTMLInputElement>(null)
	const hoursRef = useRef<HTMLInputElement>(null)
	const minutesRef = useRef<HTMLInputElement>(null)

	function toggleModal() {
		setIsModalVisible(val => !val)
		setDate({ day: '', month: '', year: '' })
		setTime({ hours: '', minutes: '' })
		setTest({
			orderId: '',
			customerId: '',
			type: 'Normal',
			description: ''
		})
	}

	function handleChangeTestInput(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { id, value } = e.target

		setTest({
			...test,
			[id]: id === 'description' ? value : value.toUpperCase()
		})
	}

	function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { id, value } = e.target
		// Remove any non-numeric characters
		const formattedValue = value.replace(/\D/g, '')

		if (id === 'day') {
			setDate({
				...date,
				[id]: Number(formattedValue) > 31 ? '31' : formattedValue
			})
			formattedValue.length === 2 && monthRef.current?.focus()
		}

		if (id === 'month') {
			setDate({
				...date,
				[id]: Number(formattedValue) > 12 ? '12' : formattedValue
			})
			formattedValue.length === 2 && yearRef.current?.focus()
		}

		if (id === 'year') {
			const todaysYear = new Date().getFullYear()
			setDate({
				...date,
				[id]:
					Number(formattedValue) < todaysYear && formattedValue.length === 4
						? String(todaysYear)
						: formattedValue
			})
			formattedValue.length === 4 && hoursRef.current?.focus()
		}
	}

	function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { id, value } = e.target
		// Remove any non-numeric characters
		const formattedValue = value.replace(/\D/g, '')

		if (id === 'hours') {
			setTime({
				...time,
				[id]: Number(formattedValue) > 23 ? '23' : formattedValue
			})
			formattedValue.length === 2 && minutesRef.current?.focus()
		}

		if (id === 'minutes') {
			setTime({
				...time,
				[id]: Number(formattedValue) > 59 ? '59' : formattedValue
			})
		}
	}

	function createTest() {
		if (
			test.type === 'Normal' &&
			(!date.year ||
				!date.month ||
				!date.day ||
				!time.hours ||
				!time.minutes ||
				!test.type ||
				!test.orderId ||
				!test.customerId)
		) {
			alert('Preencha todos os campos')
			return
		}

		if (
			test.type !== 'Normal' &&
			(!test.type || !test.orderId || !test.customerId)
		) {
			alert('Preencha todos os campos')
			return
		}

		handleCreate(
			{
				...test,
				scheduledFor: test.type === 'Normal' ? getDate(date, time) : undefined
			},
			{
				onSuccess: () => {
					toggleModal()
					refetchTests()
				}
			}
		)
	}

	return (
		<Dialog.Root open={isModalVisible} onOpenChange={toggleModal}>
			<Dialog.Overlay className='fixed inset-0 z-10 bg-black/60 data-[state=closed]:animate-[dialog-overlay-hide_150ms] data-[state=open]:animate-[dialog-overlay-show_150ms]' />
			<Dialog.Content className='fixed left-1/2 z-20 top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg bg-neutral-900 border border-foreground/40 p-8 shadow data-[state=closed]:animate-[dialog-content-hide_150ms] data-[state=open]:animate-[dialog-content-show_150ms]'>
				<div className='grid grid-cols-2 items-center gap-2'>
					<Label value='Nº de Ordem' htmlFor='orderId' />
					<Input
						id='orderId'
						value={test.orderId}
						onChange={handleChangeTestInput}
					/>
				</div>
				<div className='grid grid-cols-2 items-center gap-2'>
					<Label value='Ficha de Cliente' htmlFor='customerId' />
					<Input
						id='customerId'
						value={test.customerId}
						onChange={handleChangeTestInput}
					/>
				</div>
				<div className='grid grid-cols-3 gap-2 rounded-md p-1 bg-background shadow w-full'>
					{testValidTypes.map(type => (
						<button
							onClick={() => setTest({ ...test, type })}
							className={clsx(
								'p-1 rounded-md transition-colors hover:bg-cex',
								type === test.type && 'bg-red-800'
							)}
							key={type}>
							{type}
						</button>
					))}
				</div>
				{test.type === 'Normal' && (
					<div className='flex flex-col items-center gap-1'>
						<span className='text-xl font-bold'>Hora Marcada</span>
						<div className='flex items-center gap-1'>
							<input
								className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300'
								id='day'
								ref={dayRef}
								value={date.day}
								onChange={handleDateChange}
								placeholder='DD'
								maxLength={2}
							/>
							<span>/</span>
							<input
								className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300'
								id='month'
								ref={monthRef}
								value={date.month}
								onChange={handleDateChange}
								placeholder='MM'
								maxLength={2}
							/>
							<span>/</span>
							<input
								className='h-10 w-20 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300'
								id='year'
								ref={yearRef}
								value={date.year}
								onChange={handleDateChange}
								placeholder='AAAA'
								maxLength={4}
							/>
							<span className='mx-4'>-</span>
							<input
								className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300'
								id='hours'
								ref={hoursRef}
								value={time.hours}
								onChange={handleTimeChange}
								placeholder='hh'
								maxLength={2}
							/>
							<span>:</span>
							<input
								className='h-10 w-12 rounded bg-background border border-foreground/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-cex p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300'
								id='minutes'
								ref={minutesRef}
								value={time.minutes}
								onChange={handleTimeChange}
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
						value={test.description}
						onChange={handleChangeTestInput}
					/>
				</div>
				<div className='grid grid-cols-2 mt-6 gap-6 w-full'>
					<Dialog.Close className='flex w-full items-center justify-center p-2 hover:underline'>
						Cancelar
					</Dialog.Close>
					<button
						onClick={createTest}
						className='flex w-full items-center justify-center rounded bg-red-800 transition-colors hover:bg-cex p-2'>
						Confirmar registo
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}
