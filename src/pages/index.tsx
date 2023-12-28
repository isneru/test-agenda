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
			<div className='flex min-h-screen flex-col gap-4'>
				<Hero
					title='CeX Test Agenda'
					button='Novo teste'
					onClick={() => setIsModalVisible(val => !val)}
				/>
				<main className='flex justify-center flex-wrap gap-4 mx-auto w-full'>
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
