import { Layout } from '@components'
import { Test, Warranty } from '@components/order-cards'
import { api } from '@utils/api'

export default function Resolved() {
	const { data: allTests } = api.test.getAll.useQuery()
	const { data: allWarranties } = api.warranty.getAll.useQuery()

	return (
		<Layout>
			<div className='flex min-h-screen flex-col py-10 gap-4'>
				<header className='mb-4 flex items-center px-10'>
					<h1 className='text-center text-6xl font-bold'>
						CeX Ordens Resolvidas
					</h1>
				</header>
				<main className='mx-auto grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3'>
					{allTests?.resolvedTests?.map(order => (
						<Test key={order.id} order={order} />
					))}
					{allWarranties?.resolvedWarranties?.map(order => (
						<Warranty key={order.id} order={order} />
					))}
				</main>
			</div>
		</Layout>
	)
}
