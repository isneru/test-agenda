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
			<div className='flex min-h-screen flex-col gap-4'>
				<Hero
					title='CeX Warranty Agenda'
					button='Nova garantia'
					onClick={() => setIsModalVisible(val => !val)}
				/>
				<main className='flex justify-center flex-wrap gap-6 mx-auto w-full'>
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
