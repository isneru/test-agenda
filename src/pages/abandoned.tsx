import { Abandoned } from '@components/cards'
import { NewAbandonedModal } from '@components/modals'
import { Hero, Input, Layout } from '@components/ui'
import { api } from '@lib/api'
import { useState } from 'react'

export default function Abandoneds() {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [search, setSearch] = useState('')
	const { data: abandoned } = api.abandoned.getAll.useQuery()

	const filteredAbandoned = !!search
		? abandoned?.filter(abandoned => {
				return abandoned.id.toUpperCase().includes(search.toUpperCase())
			})
		: abandoned

	return (
		<Layout>
			<div className='flex flex-col gap-4 p-10'>
				<Hero title='CeX Abandoned Agenda'>
					<div className='flex items-center gap-2'>
						<button
							onClick={() => setIsModalVisible(val => !val)}
							className='rounded-lg bg-red-800 px-3 py-2 transition-colors hover:bg-cex'>
							Novo Abandonado
						</button>
					</div>
				</Hero>
				<Input
					placeholder='Pesquisar por Nº de Ordem'
					onChange={e => setSearch(e.target.value.toUpperCase())}
					className='py-2 px-4 rounded-full print:hidden'
					value={search}
				/>
				<main className='w-full flex flex-col mx-auto gap-y-10'>
					{filteredAbandoned?.map(order => <Abandoned order={order} />)}
				</main>
			</div>
			<NewAbandonedModal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</Layout>
	)
}
