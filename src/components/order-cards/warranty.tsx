import { CustomerIdBarcode, OrderIdBarcode } from '@components/barcodes'
import { Warranty as TWarranty } from '@prisma/client'
import { WarrantyInput } from '@components'
import { api } from '@utils/api'
import clsx from 'clsx'
import {
  ValidResolvedStatuses,
  getResolvedWarrantyStatus,
  validStatuses
} from '@lib/utils'

type WarrantyProps = {
  order: TWarranty
}

export const Warranty = ({ order }: WarrantyProps) => {
  const { mutate: changeStatus } = api.warranty.changeStatus.useMutation()
  const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()
  const { mutate: resolveWarranty } = api.warranty.markAsResolved.useMutation()

  function markWarrantyAsResolved() {
    resolveWarranty(
      { orderId: order.id },
      { onSettled: () => refetchWarranties() }
    )
  }

  function changeWarrantyStatus(status: string) {
    changeStatus(
      { orderId: order.id, status },
      { onSettled: () => refetchWarranties() }
    )
  }

  return (
    <div className="flex min-w-[400px] flex-col gap-4 rounded-md bg-red-950 p-3">
      <OrderIdBarcode orderId={order.id.toUpperCase()} />
      {!order.resolved ? (
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
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">Estado da Garantia</span>
          <span className="underline decoration-red-300 decoration-wavy">
            {getResolvedWarrantyStatus(order.status as ValidResolvedStatuses)}
          </span>
        </div>
      )}
      <WarrantyInput order={order} />
      <CustomerIdBarcode customerId={order.customerId.toUpperCase()} />
      <div className="flex w-full flex-col gap-2 mt-auto">
        <span className="text-xl font-bold">Descrição do problema</span>
        <p className="rounded bg-red-500 px-2 text-lg w-full font-medium outline-none resize-none h-32 overflow-x-auto">
          {order.description}
        </p>
      </div>
      {!order.resolved && (
        <button
          onClick={markWarrantyAsResolved}
          className="rounded-xl bg-red-900 p-2 mt-auto">
          Marcar como resolvido
        </button>
      )}
    </div>
  )
}
