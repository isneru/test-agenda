import { Order } from '@components'
import { useTestProvider } from '@lib/providers/new-order'
import { api } from '@utils/api'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const { data: allTests } = api.test.getAll.useQuery()
  const { toggleModal } = useTestProvider()

  return (
    <>
      <Head>
        <title>CeX Test Agenda</title>
        <meta name="description" content="" />
        <link rel="icon" href="/cex.png" />
      </Head>
      <div className="flex min-h-screen flex-col py-10 gap-4">
        <header className="mb-4 flex flex-col items-center justify-center gap-4">
          <h1 className="text-center text-6xl font-bold">CeX Test Agenda</h1>
          <button onClick={toggleModal} className="rounded-xl bg-red-800 p-2">
            Registar novo teste
          </button>
        </header>
        <main className="mx-auto grid grid-flow-row-dense grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
          {allTests?.unresolvedTests?.map(test => (
            <Order key={test.id} order={test} />
          ))}
        </main>
        <Link
          href="/resolved"
          className="fixed bottom-5 left-5 flex items-center justify-center rounded-full border border-red-800/10 bg-red-800/10 px-3 py-1 text-red-300 transition-colors hover:bg-red-800/20">
          Ver resolvidos
        </Link>
      </div>
    </>
  )
}
