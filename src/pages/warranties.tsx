import { Hero, Layout } from '@components'
import { NewWarrantyModal } from '@components/modals'
import { Warranty } from '@components/order-cards'
import { api } from '@utils/api'
import { useState } from 'react'

export default function Warranties() {
	const { data: allWarranties } = api.warranty.getAll.useQuery()
	const [isModalVisible, setIsModalVisible] = useState(false)

	return (
		<Layout>
			<div className='flex flex-col gap-4 p-10'>
				<Hero
					title='CeX Warranty Agenda'
					type='withButton'
					btnLabel='Nova garantia'
					onClick={() => setIsModalVisible(val => !val)}
				/>
				<main className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mx-auto gap-x-10 gap-y-6'>
					{allWarranties?.unresolvedWarranties?.map(order => (
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
