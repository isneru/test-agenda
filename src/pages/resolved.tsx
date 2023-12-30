import { Hero, Layout } from '@components'
import { Test, Warranty } from '@components/order-cards'
import * as Separator from '@radix-ui/react-separator'
import { api } from '@utils/api'

export default function Resolved() {
	const { data: allTests } = api.test.getAll.useQuery()
	const { data: allWarranties } = api.warranty.getAll.useQuery()

	return (
		<Layout>
			<div className='flex flex-col gap-4 p-10'>
				<Hero title='CeX Ordens Resolvidas' type='withoutButton' />
				<section className='flex justify-center flex-wrap gap-6 mx-auto w-full'>
					{allTests?.resolvedTests?.map(order => (
						<Test key={order.id} order={order} />
					))}
				</section>
				<Separator.Root
					className='w-full h-px my-10 bg-foreground/40'
					orientation='horizontal'
					decorative
				/>
				<section className='flex justify-center flex-wrap gap-6 mx-auto w-full'>
					{allWarranties?.resolvedWarranties?.map(order => (
						<Warranty key={order.id} order={order} />
					))}
				</section>
			</div>
		</Layout>
	)
}
