import { ObjHasFalsyValues, getDate } from '@lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import { api } from '@utils/api'
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
	const { mutateAsync: createTest } = api.test.create.useMutation()

	const [date, setDate] = useState({ day: '', month: '', year: '' })
	const [time, setTime] = useState({ hours: '', minutes: '' })
	const [test, setTest] = useState({
		orderId: '',
		customerId: '',
		isFPS: false,
		description: ''
	})

	const dayRef = useRef<HTMLInputElement>(null)
	const monthRef = useRef<HTMLInputElement>(null)
	const yearRef = useRef<HTMLInputElement>(null)
	const hoursRef = useRef<HTMLInputElement>(null)
	const minutesRef = useRef<HTMLInputElement>(null)

	function toggleModal() {
		setDate({ day: '', month: '', year: '' })
		setTime({ hours: '', minutes: '' })
		setTest({
			orderId: '',
			customerId: '',
			isFPS: false,
			description: ''
		})
		setIsModalVisible(val => !val)
	}

	function handleChangeTestInput(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setTest({
			...test,
			[e.target.id]:
				e.target.id === 'description'
					? e.target.value
					: e.target.value.toUpperCase()
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
			setDate({ ...date, [id]: formattedValue })
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

	function handleCreateTest() {
		if (
			test.isFPS
				? ObjHasFalsyValues(test)
				: ObjHasFalsyValues(test.customerId, test.orderId, date, time)
		) {
			alert('Preenche todos os campos!')
			return
		}

		createTest(
			{ ...test, scheduledFor: getDate(date, time) },
			{ onSuccess: toggleModal, onSettled: () => refetchTests() }
		)
	}

	return (
		<Dialog.Root open={isModalVisible} onOpenChange={toggleModal}>
			<Dialog.Overlay className='fixed inset-0 z-10 bg-black/60 data-[state=closed]:animate-[dialog-overlay-hide_150ms] data-[state=open]:animate-[dialog-overlay-show_150ms]' />
			<Dialog.Content className='fixed left-1/2 z-20 top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg bg-red-950 p-8 shadow data-[state=closed]:animate-[dialog-content-hide_150ms] data-[state=open]:animate-[dialog-content-show_150ms]'>
				<div className='grid grid-cols-2 items-center gap-2'>
					<label className='text-xl font-bold' htmlFor='orderId'>
						Nº de Ordem
					</label>
					<input
						className='rounded bg-red-500 px-2 text-lg font-medium outline-none'
						id='orderId'
						value={test.orderId}
						onChange={handleChangeTestInput}
					/>
				</div>
				<div className='grid grid-cols-2 items-center gap-2'>
					<label className='text-xl font-bold' htmlFor='customerId'>
						Ficha de Cliente
					</label>
					<input
						className='rounded bg-red-500 px-2 text-lg font-medium outline-none'
						id='customerId'
						value={test.customerId}
						onChange={handleChangeTestInput}
					/>
				</div>
				{!test.isFPS && (
					<div className='flex flex-col items-center gap-1'>
						<span className='text-xl font-bold'>Hora Marcada</span>
						<div className='flex items-center gap-1'>
							<input
								className='h-10 w-12 rounded bg-red-500 p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300'
								id='day'
								ref={dayRef}
								value={date.day}
								onChange={handleDateChange}
								placeholder='DD'
								maxLength={2}
							/>
							<span>/</span>
							<input
								className='h-10 w-12 rounded bg-red-500 p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300'
								id='month'
								ref={monthRef}
								value={date.month}
								onChange={handleDateChange}
								placeholder='MM'
								maxLength={2}
							/>
							<span>/</span>
							<input
								className='h-10 w-20 rounded bg-red-500 p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300'
								id='year'
								ref={yearRef}
								value={date.year}
								onChange={handleDateChange}
								placeholder='AAAA'
								maxLength={4}
							/>
							<span className='mx-4'>-</span>
							<input
								className='h-10 w-12 rounded bg-red-500 p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300'
								id='hours'
								ref={hoursRef}
								value={time.hours}
								onChange={handleTimeChange}
								placeholder='hh'
								maxLength={2}
							/>
							<span>:</span>
							<input
								className='h-10 w-12 rounded bg-red-500 p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300'
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
				<div className='flex items-center gap-2'>
					<button
						onClick={() => setTest({ ...test, isFPS: !test.isFPS })}
						role='checkbox'
						aria-checked={test.isFPS}
						data-checked={test.isFPS}
						className='h-4 w-4 rounded-sm ring-1 disabled:cursor-not-allowed data-[checked=false]:bg-tranparent-900 text-white data-[checked=false]:ring-red-500 data-[checked=true]:bg-red-500  data-[checked=true]:ring-red-600'>
						{test.isFPS && <CheckIcon />}
					</button>
					<label
						className='cursor-pointer'
						onClick={() => setTest({ ...test, isFPS: !test.isFPS })}>
						É FPS
					</label>
				</div>
				<div className='flex flex-col w-full gap-2'>
					<label className='text-xl font-bold' htmlFor='description'>
						Observações
					</label>
					<textarea
						className='rounded bg-red-500 px-2 text-lg font-medium outline-none resize-none h-32'
						id='description'
						value={test.description}
						onChange={handleChangeTestInput}
					/>
				</div>
				<div className='grid mt-auto grid-cols-2 gap-6 w-full'>
					<Dialog.Close className='flex w-full items-center justify-center p-2 hover:underline'>
						Cancelar
					</Dialog.Close>
					<button
						onClick={handleCreateTest}
						className='flex w-full items-center justify-center rounded-lg bg-red-700 p-2'>
						Confirmar registo
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	)
}
