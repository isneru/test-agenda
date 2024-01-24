import type { DateAsString } from '@lib/types'

export function formatDate(date: Date, withTime = true) {
	const day = date.getDate()
	const month = date.getMonth() + 1 // Months start from zero
	const year = date.getFullYear()
	const hours = date.getHours()
	const minutes = date.getMinutes()

	// Add leading zero if needed
	const formattedDay = addLeadingZero(day)
	const formattedMonth = addLeadingZero(month)
	const formattedHours = addLeadingZero(hours)
	const formattedMinutes = addLeadingZero(minutes)

	// Return the formatted string
	return withTime
		? `${formattedDay}/${formattedMonth}/${year} - ${formattedHours}:${formattedMinutes}`
		: `${formattedDay}/${formattedMonth}/${year}`
}

export function addLeadingZero(value: number) {
	return value < 10 ? `0${value}` : value.toString()
}

export function getDate({ date, time }: DateAsString) {
	return new Date(
		Number(date.year),
		Number(date.month) - 1,
		Number(date.day),
		Number(time.hours),
		Number(time.minutes)
	)
}

export function isEveryFieldFilled(...arr: Array<{ [key: string]: unknown }>) {
	return arr.every(obj => Object.values(obj).every(Boolean))
}

export function addThirtyDays(date: Date) {
	const newDate = new Date(date)
	newDate.setDate(newDate.getDate() + 30)
	return newDate
}

export function getInputNumberBoundaries(
	min: number,
	input: string,
	max: number,
	desiredLength: number
) {
	const value = Number(input)
	if (input.length < desiredLength) return input
	if (value < min) return addLeadingZero(min)
	if (value > max) return addLeadingZero(max)
	/* 	if (input.length < desiredLength) { 

	} */
	return addLeadingZero(value)
}

export function splitStringWithURL(str: string) {
	const regex = /((?:https?:\/\/)?(?:[\w\d-]+\.)+[\w\d]{2,}\/[^ ]+)/g
	const splitString = str.split(regex)

	if (splitString.length === 1) {
		return {
			first: splitString[0] as string,
			link: undefined,
			rest: undefined
		}
	} else if (splitString.length === 2) {
		const [first, url] = splitString
		return {
			first: first as string,
			link: {
				url: url as string,
				text: (url as string).replace(/(http(s)?:\/\/)|(\/.*){1}/g, '')
			},
			rest: undefined
		}
	} else if (splitString.length > 2) {
		const [first, url, ...rest] = splitString
		return {
			first: first as string,
			link: {
				url: url as string,
				text: (url as string).replace(/(http(s)?:\/\/)|(\/.*){1}/g, '')
			},
			rest: rest.join('')
		}
	} else {
		return {
			first: splitString[0] as string,
			url: undefined,
			rest: undefined
		}
	}
}

export const warrantyValidStatuses = ['Substituir', 'Em Análise', 'Reembolsar']

export const testValidTypes = ['Normal', 'FPS', `Drop n' Go`]
