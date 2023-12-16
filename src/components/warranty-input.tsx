import { useDebounce } from '@lib/utils'
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
    <div className="flex items-center gap-2">
      <label className="text-xl font-bold" htmlFor="warrantyRequestId">
        Nº de Warranty Request
      </label>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        className="rounded bg-red-500 px-2 text-lg font-medium outline-none w-[10ch]"
        autoFocus
        type="text"
        name="warrantyRequestId"
        id="warrantyRequestId"
      />
    </div>
  )
}
