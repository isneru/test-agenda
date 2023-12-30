import { Layout } from '@components'
import { api } from '@utils/api'

export default function Dashboard() {
	const { data } = api.dashboard.getTotalOfOrders.useQuery()

	const totalOfOrders = data ? data.testAmount + data.warrantyAmount : 0

	return <Layout>{totalOfOrders}</Layout>
}
