import { addLeadingZero } from '@lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useDebounce(
	effect: () => void,
	dependencies: any[],
	delay = 500
) {
	// store the provided effect in a `useCallback` hook to avoid
	// having the callback function execute on each render
	const callback = useCallback(effect, dependencies)

	// wrap our callback function in a `setTimeout` function
	// and clear the tim out when completed
	useEffect(
		() => {
			const timeout = setTimeout(callback, delay)
			return () => clearTimeout(timeout)
		},
		// re-execute  the effect if the delay or callback changes
		[callback, delay]
	)
}

export function useDateInputs() {
	const [date, setDate] = useState({ day: '', month: '', year: '' })
	const [time, setTime] = useState({ hours: '', minutes: '' })

	const dayRef = useRef<HTMLInputElement>(null)
	const monthRef = useRef<HTMLInputElement>(null)
	const yearRef = useRef<HTMLInputElement>(null)
	const hoursRef = useRef<HTMLInputElement>(null)
	const minutesRef = useRef<HTMLInputElement>(null)

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { id, value } = e.target
		const formattedValue = value.replace(/\D/g, '') // Remove any non-numeric characters

		const now = new Date()

		if (id === 'day') {
			const todaysDay = now.getDate()
			setDate({
				...date,
				[id]:
					Number(formattedValue) < todaysDay && formattedValue.length === 2
						? addLeadingZero(todaysDay)
						: formattedValue
			})
			formattedValue.length === 2 && monthRef.current?.focus()
		}

		if (id === 'month') {
			const todaysMonth = now.getMonth() + 1
			setDate({
				...date,
				[id]:
					Number(formattedValue) < todaysMonth && formattedValue.length === 2
						? addLeadingZero(todaysMonth)
						: formattedValue
			})
			formattedValue.length === 2 && yearRef.current?.focus()
		}

		if (id === 'year') {
			const todaysYear = now.getFullYear()
			setDate({
				...date,
				[id]:
					Number(formattedValue) < todaysYear && formattedValue.length === 4
						? todaysYear.toString()
						: formattedValue
			})
			formattedValue.length === 4 && hoursRef.current?.focus()
		}

		if (id === 'hours') {
			const todaysHours = now.getHours()
			setTime({
				...time,
				[id]:
					Number(formattedValue) < todaysHours && formattedValue.length === 2
						? addLeadingZero(todaysHours)
						: formattedValue
			})
			formattedValue.length === 2 && minutesRef.current?.focus()
		}

		if (id === 'minutes') {
			const todaysMinutes = now.getMinutes()
			setTime({
				...time,
				[id]:
					Number(formattedValue) <= todaysMinutes && formattedValue.length === 2
						? addLeadingZero(todaysMinutes + 2)
						: formattedValue
			})
		}
	}

	return {
		date,
		time,
		dayRef,
		monthRef,
		yearRef,
		hoursRef,
		minutesRef,
		handleInputChange,
		setDate,
		setTime
	}
}
