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

		const idBasedBehaviour = {
			day: () => {
				setDate(prev => ({ ...prev, [id]: formattedValue }))
				formattedValue.length === 2 && monthRef.current?.focus()
			},
			month: () => {
				setDate(prev => ({ ...prev, [id]: formattedValue }))
				formattedValue.length === 2 && yearRef.current?.focus()
			},
			year: () => {
				setDate(prev => ({ ...prev, [id]: formattedValue }))
				formattedValue.length === 4 && hoursRef.current?.focus()
			},
			hours: () => {
				setTime(prev => ({ ...prev, [id]: formattedValue }))
				formattedValue.length === 2 && minutesRef.current?.focus()
			},
			minutes: () => {
				setTime(prev => ({ ...prev, [id]: formattedValue }))
			}
		}

		idBasedBehaviour[id as keyof typeof idBasedBehaviour]()
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
