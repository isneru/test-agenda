import { NewWarrantyModal } from '@components/modals'
import { Warranty } from '@components/cards'
import { Hero, Input, Layout } from '@components/ui'
import { api } from '@lib/api'
import { useState } from 'react'

export default function Warranties() {
	const { data: allWarranties } = api.warranty.getAll.useQuery()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [search, setSearch] = useState('')

	const unresolvedWarranties = !!search
		? allWarranties?.filter(order => {
				return order.id.toUpperCase().includes(search.toUpperCase())
			})
		: allWarranties

	return (
		<Layout>
			<div className='flex flex-col gap-4 p-10'>
				<Hero title='CeX Warranty Agenda'>
					<button
						onClick={() => setIsModalVisible(val => !val)}
						className='rounded-lg bg-red-800 px-3 py-2 transition-colors hover:bg-cex'>
						Nova garantia
					</button>
				</Hero>
				<Input
					placeholder='Pesquisar por Nº de Ordem'
					onChange={e => setSearch(e.target.value.toUpperCase())}
					className='py-2 px-4 rounded-full print:hidden'
					value={search}
				/>
				<main className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mx-auto gap-x-10 gap-y-6'>
					{unresolvedWarranties?.map(order => (
						<Warranty key={order.id} order={order} />
					))}
				</main>
			</div>
			<NewWarrantyModal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</Layout>
	)
}
