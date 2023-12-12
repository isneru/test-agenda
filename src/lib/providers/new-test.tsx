import { createContext, ReactNode, useContext, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Poppins } from 'next/font/google'
import { api } from '@utils/api'
import clsx from 'clsx'
import { getDate } from '@lib/utils'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})

interface TestContextData {
  isModalVisible: boolean
  toggleModal: () => void
}

export const TestContext = createContext({} as TestContextData)

interface TestProviderProps {
  children: ReactNode
}

export const TestProvider = ({ children }: TestProviderProps) => {
  const [newTest, setNewTest] = useState({
    testId: 'PTMSPG',
    customerId: ''
  })
  const [date, setDate] = useState({
    day: '',
    month: '',
    year: ''
  })
  const [time, setTime] = useState({ hours: '', minutes: '' })

  const { refetch: refetchUnresolvedTests } = api.test.getAll.useQuery()
  const { mutateAsync: createTest } = api.test.create.useMutation()

  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModal() {
    setIsModalVisible(!isModalVisible)

    setNewTest({
      testId: 'PTMSPG',
      customerId: ''
    })
    setDate({
      day: '',
      month: '',
      year: ''
    })
    setTime({ hours: '', minutes: '' })
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    // Remove any non-numeric characters
    const formattedValue = value.replace(/\D/g, '')

    if (event.target.name === 'day') {
      setDate({
        ...date,
        [event.target.name]: Number(formattedValue) > 31 ? '31' : formattedValue
      })
    }

    if (event.target.name === 'month') {
      setDate({
        ...date,
        [event.target.name]: Number(formattedValue) > 12 ? '12' : formattedValue
      })
    }

    if (event.target.name === 'year') {
      setDate({ ...date, [event.target.name]: formattedValue })
    }
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    // Remove any non-numeric characters
    const formattedValue = value.replace(/\D/g, '')

    if (event.target.name === 'hours') {
      setTime({
        ...time,
        [event.target.name]: Number(formattedValue) > 23 ? '23' : formattedValue
      })
    }

    if (event.target.name === 'minutes') {
      setTime({
        ...time,
        [event.target.name]: Number(formattedValue) > 59 ? '59' : formattedValue
      })
    }
  }

  function handleCreateTest() {
    if (
      !newTest.testId ||
      !newTest.customerId ||
      !date.day ||
      !date.month ||
      !date.year ||
      !time.hours ||
      !time.minutes
    ) {
      alert('Preenche todos os campos!')
      return
    }
    createTest(
      {
        ...newTest,
        scheduledFor: getDate(date, time)
      },
      {
        onSuccess: toggleModal,
        onSettled: () => refetchUnresolvedTests()
      }
    )
  }

  return (
    <div className={poppins.className}>
      <TestContext.Provider value={{ isModalVisible, toggleModal }}>
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
                  <label className="text-xl font-bold" htmlFor="testId">
                    Nº de Ordem
                  </label>
                  <input
                    className="rounded bg-red-500 px-2 text-lg font-medium outline-none"
                    autoFocus
                    type="text"
                    name="testId"
                    id="testId"
                    value={newTest.testId}
                    onChange={e =>
                      setNewTest({
                        ...newTest,
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
                    value={newTest.customerId}
                    onChange={e =>
                      setNewTest({
                        ...newTest,
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
                    type="text"
                    value={time.minutes}
                    onChange={handleTimeChange}
                    placeholder="mm"
                    maxLength={2}
                  />
                </div>
                <button
                  onClick={handleCreateTest}
                  className="mt-auto flex w-full items-center justify-center rounded-xl bg-red-800 p-2">
                  Confirmar registo
                </button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </TestContext.Provider>
    </div>
  )
}

export const useTestProvider = () => useContext(TestContext)
