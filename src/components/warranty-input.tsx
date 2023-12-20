import { useDebounce } from '@lib/hooks'
import { Warranty } from '@prisma/client'
import { api } from '@utils/api'
import { useEffect, useState } from 'react'

type WarrantyInputProps = {
  order: Warranty
}

export const WarrantyInput = ({ order }: WarrantyInputProps) => {
  const [input, setInput] = useState(order.warrantyRequestId ?? '')
  const debouncedInput = useDebounce(input)
  const { mutate: changeRequestId } = api.warranty.changeRequestId.useMutation()
  const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()

  useEffect(() => {
    changeRequestId(
      { orderId: order.id, warrantyRequestId: debouncedInput },
      { onSettled: () => refetchWarranties() }
    )
  }, [debouncedInput])

  return (
    <div className="flex items-center justify-between w-full">
      {order.status === 'Substituir' ? (
        <>
          <label className="text-xl font-bold" htmlFor="warrantyRequestId">
            Nº de Warranty Request
          </label>
          <input
            disabled={order.resolved}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="rounded bg-red-500 px-2 text-lg font-medium outline-none w-[10ch] text-center"
            type="text"
            name="warrantyRequestId"
            id="warrantyRequestId"
          />
        </>
      ) : (
        <>
          <p className="text-xl font-bold">Nº de Warranty Request</p>
          <span className="rounded bg-red-500 px-2 text-lg font-medium outline-none w-[10ch] text-center">
            N/A
          </span>
        </>
      )}
    </div>
  )
}
