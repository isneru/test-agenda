import { createContext, ReactNode, useContext, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Poppins } from 'next/font/google'
import { api } from '@utils/api'
import clsx from 'clsx'
import { getDate } from '@lib/utils'
import { CheckIcon } from '@radix-ui/react-icons'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})

interface OrderContextData {
  isModalVisible: boolean
  toggleModal: () => void
}

export const OrderContext = createContext({} as OrderContextData)

interface OrderProviderProps {
  children: ReactNode
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [newOrder, setNewOrder] = useState({
    orderId: '',
    customerId: '',
    description: ''
  })
  const [date, setDate] = useState({ day: '', month: '', year: '' })
  const [time, setTime] = useState({ hours: '', minutes: '' })
  const [isWarranty, setIsWarranty] = useState(false)

  const dayRef = useRef<HTMLInputElement>(null)
  const monthRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)
  const hoursRef = useRef<HTMLInputElement>(null)
  const minutesRef = useRef<HTMLInputElement>(null)

  const { refetch: refetchTests } = api.test.getAll.useQuery()
  const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()
  const { mutateAsync: createTest } = api.test.create.useMutation()
  const { mutateAsync: createWarranty } = api.warranty.create.useMutation()

  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModal() {
    setIsModalVisible(!isModalVisible)

    setNewOrder({
      orderId: '',
      customerId: '',
      description: ''
    })
    setIsWarranty(false)
    setDate({ day: '', month: '', year: '' })
    setTime({ hours: '', minutes: '' })
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    // Remove any non-numeric characters
    const formattedValue = value.replace(/\D/g, '')

    if (name === 'day') {
      setDate({
        ...date,
        [name]: Number(formattedValue) > 31 ? '31' : formattedValue
      })
      formattedValue.length === 2 && monthRef.current?.focus()
    }

    if (name === 'month') {
      setDate({
        ...date,
        [name]: Number(formattedValue) > 12 ? '12' : formattedValue
      })
      formattedValue.length === 2 && yearRef.current?.focus()
    }

    if (name === 'year') {
      setDate({ ...date, [name]: formattedValue })
      formattedValue.length === 4 && hoursRef.current?.focus()
    }
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    // Remove any non-numeric characters
    const formattedValue = value.replace(/\D/g, '')

    if (name === 'hours') {
      setTime({
        ...time,
        [name]: Number(formattedValue) > 23 ? '23' : formattedValue
      })
      formattedValue.length === 2 && minutesRef.current?.focus()
    }

    if (name === 'minutes') {
      setTime({
        ...time,
        [name]: Number(formattedValue) > 59 ? '59' : formattedValue
      })
    }
  }

  function handleCreateOrder() {
    if (
      !newOrder.orderId ||
      !newOrder.customerId ||
      !date.day ||
      !date.month ||
      !date.year ||
      !time.hours ||
      !time.minutes
    ) {
      alert('Preenche todos os campos!')
      return
    }

    isWarranty
      ? createWarranty(
          { ...newOrder },
          { onSuccess: toggleModal, onSettled: () => refetchWarranties() }
        )
      : createTest(
          { ...newOrder, scheduledFor: getDate(date, time) },
          { onSuccess: toggleModal, onSettled: () => refetchTests() }
        )
  }

  return (
    <div className={poppins.className}>
      <OrderContext.Provider value={{ isModalVisible, toggleModal }}>
        {children}
        {isModalVisible && (
          <Dialog.Root open={isModalVisible} onOpenChange={toggleModal}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60" />
              <Dialog.Content
                className={clsx(
                  'fixed left-1/2 top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-xl bg-red-950 p-8',
                  poppins.className
                )}>
                <div className="grid grid-cols-2 items-center gap-2">
                  <label className="text-xl font-bold" htmlFor="orderId">
                    Nº de Ordem
                  </label>
                  <input
                    className="rounded bg-red-500 px-2 text-lg font-medium outline-none"
                    autoFocus
                    type="text"
                    name="orderId"
                    id="orderId"
                    value={newOrder.orderId}
                    onChange={e =>
                      setNewOrder({
                        ...newOrder,
                        [e.target.name]: e.target.value.toUpperCase()
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-2">
                  <label className="text-xl font-bold" htmlFor="customerId">
                    Ficha de Cliente
                  </label>
                  <input
                    className="rounded bg-red-500 px-2 text-lg font-medium outline-none"
                    type="text"
                    name="customerId"
                    id="customerId"
                    value={newOrder.customerId}
                    onChange={e =>
                      setNewOrder({
                        ...newOrder,
                        [e.target.name]: e.target.value.toUpperCase()
                      })
                    }
                  />
                </div>
                <span className="text-xl font-bold">Hora Marcada</span>
                <div className="flex items-center gap-1">
                  <input
                    className="h-10 w-12 rounded bg-red-500 p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300"
                    name="day"
                    ref={dayRef}
                    type="text"
                    value={date.day}
                    onChange={handleDateChange}
                    placeholder="DD"
                    maxLength={2}
                  />
                  <span>/</span>
                  <input
                    className="h-10 w-12 rounded bg-red-500 p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300"
                    name="month"
                    ref={monthRef}
                    type="text"
                    value={date.month}
                    onChange={handleDateChange}
                    placeholder="MM"
                    maxLength={2}
                  />
                  <span>/</span>
                  <input
                    className="h-10 w-20 rounded bg-red-500 p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300"
                    name="year"
                    ref={yearRef}
                    type="text"
                    value={date.year}
                    onChange={handleDateChange}
                    placeholder="YYYY"
                    maxLength={4}
                  />

                  <span className="mx-4">-</span>
                  <input
                    className="h-10 w-12 rounded bg-red-500 p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300"
                    name="hours"
                    ref={hoursRef}
                    type="text"
                    value={time.hours}
                    onChange={handleTimeChange}
                    placeholder="hh"
                    maxLength={2}
                  />
                  <span>:</span>
                  <input
                    className="h-10 w-12 rounded bg-red-500 p-2 text-center text-lg font-medium outline-none placeholder:text-sm placeholder:text-red-300"
                    name="minutes"
                    ref={minutesRef}
                    type="text"
                    value={time.minutes}
                    onChange={handleTimeChange}
                    placeholder="mm"
                    maxLength={2}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsWarranty(!isWarranty)}
                    role="checkbox"
                    aria-checked={isWarranty}
                    data-checked={isWarranty}
                    className="h-4 w-4 rounded-sm ring-1 disabled:cursor-not-allowed data-[checked=false]:bg-tranparent-900 text-white data-[checked=false]:ring-red-500 data-[checked=true]:bg-red-500  data-[checked=true]:ring-red-600">
                    {isWarranty && <CheckIcon />}
                  </button>
                  <label
                    className="cursor-pointer"
                    onClick={() => setIsWarranty(!isWarranty)}>
                    É garantia
                  </label>
                </div>
                {isWarranty && (
                  <div className="flex flex-col w-full gap-2">
                    <label className="text-xl font-bold" htmlFor="description">
                      Descrição do problema
                    </label>
                    <textarea
                      className="rounded bg-red-500 px-2 text-lg font-medium outline-none resize-none h-32"
                      name="description"
                      id="description"
                      value={newOrder.description}
                      onChange={e =>
                        setNewOrder({
                          ...newOrder,
                          [e.target.name]: e.target.value
                        })
                      }
                    />
                  </div>
                )}
                <button
                  onClick={handleCreateOrder}
                  className="mt-auto flex w-full items-center justify-center rounded-xl bg-red-900 p-2">
                  Confirmar registo
                </button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </OrderContext.Provider>
    </div>
  )
}

export const useModal = () => useContext(OrderContext)
