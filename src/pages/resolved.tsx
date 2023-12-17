import { Order } from '@components'
import { api } from '@utils/api'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Resolved() {
  const { data: allTests } = api.test.getAll.useQuery()
  const { data: allWarranties } = api.warranty.getAll.useQuery()
  const [showTests, setShowTests] = useState(true)
  const [showWarranties, setShowWarranties] = useState(true)

  return (
    <>
      <Head>
        <title>CeX Test Agenda</title>
        <meta name="description" content="" />
        <link rel="icon" href="/cex.png" />
      </Head>
      <div className="flex min-h-screen flex-col py-10 gap-4">
        <header className="flex items-center justify-center mb-[72px] gap-10">
          <button
            onClick={() => setShowTests(val => !val)}
            className="items-center justify-center rounded-full border border-red-800/10 bg-red-900/10 px-3 py-1 text-red-300 transition-colors hover:bg-red-900/20">
            {showTests ? 'Esconder Testes' : 'Mostrar Testes'}
          </button>
          <h1 className="text-center text-6xl font-bold">
            CeX Ordens Resolvidas
          </h1>
          <button
            onClick={() => setShowWarranties(val => !val)}
            className="items-center justify-center rounded-full border border-red-800/10 bg-red-900/10 px-3 py-1 text-red-300 transition-colors hover:bg-red-900/20">
            {showWarranties ? 'Esconder Garantias' : 'Mostrar Garantias'}
          </button>
        </header>
        {showTests && (
          <main className="mx-auto grid  grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
            {allTests?.resolvedTests?.map(test => (
              <Order key={test.id} order={test} />
            ))}
          </main>
        )}
        {showWarranties && (
          <main className="mx-auto grid  grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
            {allWarranties?.resolvedWarranties?.map(warranty => (
              <Order key={warranty.id} order={warranty} />
            ))}
          </main>
        )}
        <Link
          href="/"
          className="fixed bottom-5 left-5 flex items-center justify-center rounded-full border border-red-800/10 bg-red-900/10 px-3 py-1 text-red-300 transition-colors hover:bg-red-900/20">
          Testes
        </Link>
        <Link
          href="/warranties"
          className="fixed bottom-5 right-5 flex items-center justify-center rounded-full border border-red-800/10 bg-red-900/10 px-3 py-1 text-red-300 transition-colors hover:bg-red-900/20">
          Garantias
        </Link>
      </div>
    </>
  )
}
