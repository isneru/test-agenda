import { Test, Warranty } from '@prisma/client'
import {
  ValidResolvedStatuses,
  formatDate,
  getResolvedWarrantyStatus,
  validStatuses
} from '@lib/utils'
import Barcode from 'react-jsbarcode'
import colors from 'tailwindcss/colors'
import { api } from '@utils/api'
import clsx from 'clsx'
import { WarrantyInput } from '@components'

type TestProps = {
  order: Test | Warranty
}

export const Order = ({ order }: TestProps) => {
  const { mutate: changeStatus } = api.warranty.changeStatus.useMutation()
  const { mutate: resolveTest } = api.test.markAsResolved.useMutation()
  const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()
  const { refetch: refetchTests } = api.test.getAll.useQuery()
  const { mutate: resolveWarranty } = api.warranty.markAsResolved.useMutation()

  function markWarrantyAsResolved() {
    resolveWarranty(
      { orderId: order.id },
      { onSettled: () => refetchWarranties() }
    )
  }

  function markTestAsResolved() {
    resolveTest({ orderId: order.id }, { onSettled: () => refetchTests() })
  }

  function changeWarrantyStatus(status: string) {
    changeStatus(
      { orderId: order.id, status },
      { onSettled: () => refetchWarranties() }
    )
  }

  // verifica se é um teste ou uma garantia
  if ('scheduledFor' in order) {
    return (
      <div className="flex min-w-[400px] flex-col gap-4 rounded-md bg-red-950 p-3 relative overflow-hidden">
        <div className="flex flex-col items-center justify-between">
          <h2 className="text-2xl font-bold">{order.id.toUpperCase()}</h2>
          <Barcode
            className="rounded"
            value={order.id.toUpperCase()}
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
            {formatDate(order.scheduledFor)}
          </span>
        </div>
        <div className="flex w-full flex-col items-center">
          <p className="text-2xl font-bold">Ficha de Cliente</p>
          <Barcode
            className="rounded"
            value={order.customerId.toUpperCase()}
            options={{
              background: colors.red[300],
              displayValue: false,
              height: 50
            }}
          />
          <span>{order.customerId.toUpperCase()}</span>
        </div>
        {!order.resolved && (
          <button
            onClick={markTestAsResolved}
            className="rounded-xl bg-red-900 p-2">
            Marcar como resolvido
          </button>
        )}
      </div>
    )
  } else {
    return (
      <div className="flex min-w-[400px] flex-col gap-4 rounded-md bg-red-950 p-3 relative overflow-hidden">
        <div className="flex flex-col items-center justify-between">
          <h2 className="text-2xl font-bold">{order.id.toUpperCase()}</h2>
          <Barcode
            className="rounded"
            value={order.id.toUpperCase()}
            options={{
              background: colors.red[300],
              displayValue: false,
              height: 50
            }}
          />
        </div>
        {!order.resolved ? (
          <>
            <div className="grid grid-cols-3 gap-2 rounded-md p-1 bg-red-900">
              {validStatuses.map(status => (
                <button
                  onClick={() => changeWarrantyStatus(status)}
                  className={clsx(
                    'p-1 rounded-md',
                    status === order.status && 'bg-red-500'
                  )}
                  key={status}>
                  {status}
                </button>
              ))}
            </div>
            {order.status === 'Substituir' && <WarrantyInput order={order} />}
          </>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">Estado da Garantia</span>
            <span className="underline decoration-red-300 decoration-wavy">
              {getResolvedWarrantyStatus(order.status as ValidResolvedStatuses)}
            </span>
          </div>
        )}
        <div className="flex w-full flex-col items-center">
          <p className="text-2xl font-bold">Ficha de Cliente</p>
          <Barcode
            className="rounded"
            value={order.customerId.toUpperCase()}
            options={{
              background: colors.red[300],
              displayValue: false,
              height: 50
            }}
          />
          <span>{order.customerId.toUpperCase()}</span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <span className="text-xl font-bold">Descrição do problema</span>
          <p className="rounded bg-red-500 px-2 text-lg w-full font-medium outline-none resize-none h-32 overflow-x-auto">
            {order.description}
          </p>
        </div>
        {!order.resolved && (
          <button
            onClick={markWarrantyAsResolved}
            className="rounded-xl bg-red-900 p-2">
            Marcar como resolvido
          </button>
        )}
      </div>
    )
  }
}
