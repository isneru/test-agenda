import { Layout } from '@components'
import { Input, Label } from '@components/ui'
import { useState } from 'react'

export default function Helpers() {
	const [values, setValues] = useState([
		{
			label: 'Notas de 500',
			amount: '',
			multiplier: 500
		},
		{
			label: 'Notas de 200',
			amount: '',
			multiplier: 200
		},
		{
			label: 'Notas de 100',
			amount: '',
			multiplier: 100
		},
		{
			label: 'Notas de 50',
			amount: '',
			multiplier: 50
		},
		{
			label: 'Notas de 20',
			amount: '',
			multiplier: 20
		},
		{
			label: 'Notas de 10',
			amount: '',
			multiplier: 10
		},
		{
			label: 'Notas de 5',
			amount: '',
			multiplier: 5
		},
		{
			label: 'Moedas de 2',
			amount: '',
			multiplier: 2
		},
		{
			label: 'Moedas de 1',
			amount: '',
			multiplier: 1
		},
		{
			label: 'Moedas de 0,50',
			amount: '',
			multiplier: 0.5
		},
		{
			label: 'Moedas de 0,20',
			amount: '',
			multiplier: 0.2
		},
		{
			label: 'Moedas de 0,10',
			amount: '',
			multiplier: 0.1
		},
		{
			label: 'Moedas de 0,05',
			amount: '',
			multiplier: 0.05
		},
		{
			label: 'Moedas de 0,02',
			amount: '',
			multiplier: 0.02
		},
		{
			label: 'Moedas de 0,01',
			amount: '',
			multiplier: 0.01
		}
	])

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { id, value } = e.target
		const formattedValue = value.replace(/\D/g, '')

		setValues(prev => {
			const newValues = [...prev]
			newValues[Number(id)]!.amount = formattedValue
			return newValues
		})
	}

	const total = values.reduce((acc, curr) => {
		return acc + (!!curr.amount ? Number(curr.amount) : 0) * curr.multiplier
	}, 0)

	return (
		<Layout>
			<main className='flex flex-col w-full gap-4 p-10'>
				<section className='text-xl flex flex-col gap-4 bg-background border border-foreground/40 p-4 rounded-lg min-h-[220px] print:hidden'>
					<p className='font-bold'>Contar Dinheiro</p>
					<div className='grid grid-cols-2 gap-4'>
						{values.map((value, id) => (
							<div key={value.label} className='flex gap-2'>
								<Input
									id={id.toString()}
									className='w-[4ch]'
									onChange={handleInputChange}
									value={value.amount}
								/>
								x {value.label} ={' '}
								{Math.round(
									(!!value.amount ? Number(value.amount) : 0) *
										value.multiplier *
										1000
								) / 1000}{' '}
							</div>
						))}
						<p className='text-xl font-bold'>
							Total: {Math.round(total * 1000) / 1000} €
						</p>
					</div>
				</section>
			</main>
		</Layout>
	)
}
