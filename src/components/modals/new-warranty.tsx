import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { ObjHasFalsyValues } from '@lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { api } from '@utils/api'

type NewWarrantyModalProps = {
  isModalVisible: boolean
  setIsModalVisible: Dispatch<SetStateAction<boolean>>
}

export const NewWarrantyModal = ({
  isModalVisible,
  setIsModalVisible
}: NewWarrantyModalProps) => {
  const { refetch: refetchWarranties } = api.warranty.getAll.useQuery()
  const { mutateAsync: createWarranty } = api.warranty.create.useMutation()

  const [warranty, setWarranty] = useState({
    orderId: '',
    customerId: '',
    description: ''
  })

  function toggleModal() {
    setWarranty({
      orderId: '',
      customerId: '',
      description: ''
    })
    setIsModalVisible(val => !val)
  }

  function handleChangeWarrantyInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setWarranty({
      ...warranty,
      [e.target.id]:
        e.target.id === 'description'
          ? e.target.value
          : e.target.value.toUpperCase()
    })
  }

  function handleCreateWarranty() {
    if (ObjHasFalsyValues(warranty)) {
      alert('Preenche todos os campos!')
      return
    }

    createWarranty(warranty, {
      onSuccess: toggleModal,
      onSettled: () => refetchWarranties()
    })
  }

  return (
    <Dialog.Root open={isModalVisible} onOpenChange={toggleModal}>
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />
      <Dialog.Content className="fixed left-1/2 top-1/2 flex w-[460px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-xl bg-red-950 p-8">
        <div className="grid grid-cols-2 items-center gap-2">
          <label className="text-xl font-bold" htmlFor="orderId">
            Nº de Ordem
          </label>
          <input
            className="rounded bg-red-500 px-2 text-lg font-medium outline-none"
            autoFocus
            id="orderId"
            value={warranty.orderId}
            onChange={handleChangeWarrantyInput}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-2">
          <label className="text-xl font-bold" htmlFor="customerId">
            Ficha de Cliente
          </label>
          <input
            className="rounded bg-red-500 px-2 text-lg font-medium outline-none"
            id="customerId"
            value={warranty.customerId}
            onChange={handleChangeWarrantyInput}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label className="text-xl font-bold" htmlFor="description">
            Descrição do problema
          </label>
          <textarea
            className="rounded bg-red-500 px-2 text-lg font-medium outline-none resize-none h-32"
            id="description"
            value={warranty.description}
            onChange={handleChangeWarrantyInput}
          />
        </div>
        <button
          onClick={handleCreateWarranty}
          className="mt-auto flex w-full items-center justify-center rounded-xl bg-red-900 p-2">
          Confirmar registo
        </button>
      </Dialog.Content>
    </Dialog.Root>
  )
}
