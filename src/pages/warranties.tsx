import { Hero, Layout } from '@components'
import { NewWarrantyModal } from '@components/modals'
import { Warranty } from '@components/order-cards'
import { Input } from '@components/ui'
import { api } from '@utils/api'
import { useState } from 'react'

export default function Warranties() {
	const { data: allWarranties } = api.warranty.getAll.useQuery()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [search, setSearch] = useState('')

	const unresolvedWarranties = !!search
		? allWarranties?.filter(order => {
				return order.id.toUpperCase().startsWith(search.toUpperCase())
		  })
		: allWarranties
	return (
		<Layout>
			<div className='flex flex-col gap-4 p-10'>
				<Hero
					title='CeX Warranty Agenda'
					type='withButton'
					btnLabel='Nova garantia'
					onClick={() => setIsModalVisible(val => !val)}
				/>
				<Input
					placeholder='Pesquisar por ID da ordem'
					onChange={e => setSearch(e.target.value.toUpperCase())}
					className='py-2 px-4 rounded-full'
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
