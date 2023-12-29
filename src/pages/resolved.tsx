import { Hero, Layout } from '@components'
import { Test, Warranty } from '@components/order-cards'
import { api } from '@utils/api'

export default function Resolved() {
	const { data: allTests } = api.test.getAll.useQuery()
	const { data: allWarranties } = api.warranty.getAll.useQuery()

	return (
		<Layout>
			<div className='flex min-h-screen flex-col gap-4 p-10'>
				<Hero title='CeX Ordens Resolvidas' withButton={false} />
				<main className='flex justify-center flex-wrap gap-6 mx-auto w-full'>
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
