import { useEffect, useState } from 'react'

export function formatDate(date: Date) {
  const day = date.getDate()
  const month = date.getMonth() + 1 // Months start from zero
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // Add leading zero if needed
  const formattedDay = day < 10 ? `0${day}` : day
  const formattedMonth = month < 10 ? `0${month}` : month
  const formattedHours = hours < 10 ? `0${hours}` : hours
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  // Return the formatted string
  return `${formattedDay}/${formattedMonth}/${year} - ${formattedHours}:${formattedMinutes}`
}

export function getDate(
  date: {
    year: string
    month: string
    day: string
  },
  time: {
    hours: string
    minutes: string
  }
) {
  return new Date(
    Number(date.year),
    Number(date.month) - 1,
    Number(date.day),
    Number(time.hours),
    Number(time.minutes)
  )
}

const resolvedStatuses = {
  Substituir: 'Substituído',
  Reembolsar: 'Reembolsado'
}

export const validStatuses = ['Substituir', 'Em Análise', 'Reembolsar']

export type ValidResolvedStatuses = keyof typeof resolvedStatuses

export function getResolvedWarrantyStatus(status: ValidResolvedStatuses) {
  return resolvedStatuses[status] ?? 'Sem Efeito'
}

export function useDebounce<T>(value: T, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

export function ObjHasFalsyValues(...objs: any[]) {
  return objs.every(obj => Object.values(obj).every(Boolean))
}
