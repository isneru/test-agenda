import { Hero, Layout } from '@components'
import { Test } from '@components/order-cards'
import { Input } from '@components/ui'
import { api } from '@lib/api'
import { useState } from 'react'

export default function WaitingPickup() {
	const { data: allTests } = api.test.getAll.useQuery()
	const [search, setSearch] = useState('')

	const testsToPickup = !!search
		? allTests?.waitingPickup.filter(order => {
				return order.id.toUpperCase().includes(search.toUpperCase())
		  })
		: allTests?.waitingPickup

	return (
		<Layout>
			<div className='flex flex-col gap-4 p-10'>
				<Hero type='withoutButton' title='CeX Test Agenda' />
				<Input
					placeholder='Pesquisar por ID da ordem'
					onChange={e => setSearch(e.target.value.toUpperCase())}
					className='py-2 px-4 rounded-full print:hidden'
					value={search}
				/>
				<main className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mx-auto gap-x-10 gap-y-6'>
					{testsToPickup?.map(order => (
						<Test key={order.id} order={order} />
					))}
				</main>
			</div>
		</Layout>
	)
}
