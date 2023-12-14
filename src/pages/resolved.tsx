import { Test } from '@components'
import { api } from '@utils/api'
import Head from 'next/head'
import Link from 'next/link'

export default function Resolved() {
  const { data: allTests } = api.test.getAll.useQuery()

  return (
    <>
      <Head>
        <title>CeX Test Agenda</title>
        <meta name="description" content="" />
        <link rel="icon" href="/cex.png" />
      </Head>
      <div className="flex min-h-screen flex-col py-10 gap-4">
        <header className="flex flex-col items-center justify-center mb-[72px]">
          <h1 className="text-center text-6xl font-bold">
            CeX Test Agenda (Resolvidos)
          </h1>
        </header>
        <main className="mx-auto grid grid-flow-row-dense grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
          {allTests?.resolvedTests?.map(test => (
            <Test key={test.id} test={test} />
          ))}
        </main>
        <Link
          href="/"
          className="absolute bottom-5 left-5 flex items-center justify-center rounded-full border border-red-800/10 bg-red-800/10 px-3 py-1 text-red-300 transition-colors hover:bg-red-800/20">
          Voltar
        </Link>
      </div>
    </>
  )
}
