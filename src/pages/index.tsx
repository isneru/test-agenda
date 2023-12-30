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
			<div className='flex flex-col gap-4 p-10'>
				<Hero
					type='withButton'
					title='CeX Test Agenda'
					btnLabel='Novo teste'
					onClick={() => setIsModalVisible(val => !val)}
				/>
				<main className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mx-auto gap-x-10 gap-y-6'>
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
