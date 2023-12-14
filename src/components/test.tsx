import { Test as TTest } from '@prisma/client'
import { formatDate } from '@lib/utils'
import Barcode from 'react-jsbarcode'
import colors from 'tailwindcss/colors'
import { api } from '@utils/api'

type TestProps = {
  test: TTest
}

export const Test = ({ test }: TestProps) => {
  const { mutate } = api.test.markTestAsResolved.useMutation()
  const { refetch: refetchUnresolvedTests } = api.test.getAll.useQuery()

  function markTestAsResolved() {
    mutate({ testId: test.id }, { onSettled: () => refetchUnresolvedTests() })
  }

  return (
    <div className="flex min-w-[400px] flex-col gap-4 rounded-md bg-red-950 p-3 relative overflow-hidden">
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-2xl font-bold">{test.id.toUpperCase()}</h2>
        <Barcode
          className="rounded"
          value={test.id.toUpperCase()}
          options={{
            background: colors.red[300],
            displayValue: false,
            height: 50
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">Hora Marcada</span>
        <span className="underline decoration-red-300 decoration-wavy">
          {formatDate(test.scheduledFor)}
        </span>
      </div>
      <div className="flex w-full flex-col items-center">
        <p className="text-2xl font-bold">Ficha de Cliente</p>
        <Barcode
          className="rounded"
          value={test.customerId.toUpperCase()}
          options={{
            background: colors.red[300],
            displayValue: false,
            height: 50
          }}
        />
        <span>{test.customerId.toUpperCase()}</span>
      </div>
      {!test.resolved && (
        <button
          onClick={markTestAsResolved}
          className="rounded-xl bg-red-800 p-2">
          Marcar como resolvido
        </button>
      )}
    </div>
  )
}
