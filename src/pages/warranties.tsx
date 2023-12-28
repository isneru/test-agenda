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
			<div className='flex min-h-screen flex-col py-10 gap-4'>
				<Hero
					titleLabel='CeX Warranty Agenda'
					buttonLabel='Registar nova garantia'
					onClick={() => setIsModalVisible(val => !val)}
				/>
				<main className='mx-auto grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3'>
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
