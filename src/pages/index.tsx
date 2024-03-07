import { NewTestModal } from '@components/modals'
import { Test } from '@components/cards'
import { Hero, Input, Layout } from '@components/ui'
import { api } from '@lib/api'
import { useState } from 'react'
import { useDebounce } from '@lib/hooks'

export default function Home() {
	const { data: tests } = api.test.getAll.useQuery()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [search, setSearch] = useState('')
	const [isCopied, setIsCopied] = useState(false)

	useDebounce(() => setIsCopied(false), [isCopied], 2000)

	const filteredTests = !!search
		? tests?.filter(test => {
				return test.id.toUpperCase().includes(search.toUpperCase())
			})
		: tests

	return (
		<Layout>
			<div className='flex flex-col gap-4 p-10'>
				<Hero title='CeX Test Agenda'>
					<div className='flex items-center gap-2'>
						<button
							onClick={() => setIsModalVisible(val => !val)}
							className='rounded-lg bg-red-800 px-3 py-2 transition-colors hover:bg-cex'>
							Novo teste
						</button>
					</div>
				</Hero>
				<Input
					placeholder='Pesquisar por Nº de Ordem'
					onChange={e => setSearch(e.target.value.toUpperCase())}
					className='py-2 px-4 rounded-full print:hidden'
					value={search}
				/>
				<main className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mx-auto gap-x-10 gap-y-6'>
					{filteredTests?.map(order => <Test key={order.id} order={order} />)}
				</main>
			</div>
			<NewTestModal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</Layout>
	)
}
