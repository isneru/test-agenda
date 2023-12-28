import { Hero, Layout } from '@components'
import { NewTestModal } from '@components/modals'
import { Test } from '@components/order-cards'
import { api } from '@utils/api'
import { useState } from 'react'

export default function Home() {
	const { data: allTests } = api.test.getAll.useQuery()
	const [isModalVisible, setIsModalVisible] = useState(false)

	return (
		<Layout>
			<div className='flex min-h-screen flex-col py-10 gap-4'>
				<Hero
					titleLabel='CeX Test Agenda'
					buttonLabel='Registar novo teste'
					onClick={() => setIsModalVisible(val => !val)}
				/>
				<main className='mx-auto grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3'>
					{allTests?.unresolvedTests?.map(order => (
						<Test key={order.id} order={order} />
					))}
				</main>
			</div>
			<NewTestModal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</Layout>
	)
}
