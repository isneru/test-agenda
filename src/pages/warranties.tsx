import { Layout } from '@components'
import { NewWarrantyModal } from '@components/modals'
import { Warranty } from '@components/order-cards'
import { api } from '@utils/api'
import Link from 'next/link'
import { useState } from 'react'

export default function Warranties() {
	const { data: allWarranties } = api.warranty.getAll.useQuery()
	const [isModalVisible, setIsModalVisible] = useState(false)

	return (
		<Layout>
			<div className='flex min-h-screen flex-col py-10 gap-4'>
				<header className='mb-4 flex flex-col items-center justify-center gap-4'>
					<h1 className='text-center text-6xl font-bold'>
						CeX Warranty Agenda
					</h1>
					<button
						onClick={() => setIsModalVisible(val => !val)}
						className='rounded-lg bg-red-900 p-2'>
						Registar nova garantia
					</button>
				</header>
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
