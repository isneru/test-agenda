import type { DateAsString, SplitTextPart } from '@lib/types'

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

export function addFourteenDays(date: Date) {
	const newDate = new Date(date)
	newDate.setDate(newDate.getDate() + 14)
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
	const parts: Array<SplitTextPart> = []

	str.split(regex).forEach(part => {
		parts.push(
			isLink(part)
				? { type: 'link', ...makeValidURL(part) }
				: { type: 'text', text: part }
		)
	})

	return parts
}

function isLink(str: string) {
	return (
		str.startsWith('http://') ||
		str.startsWith('https://') ||
		str.startsWith('www.')
	)
}

function makeValidURL(str: string) {
	return {
		url: str,
		text: str.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '')
	}
}

export const warrantyValidStatuses = [
	'Substituir',
	'Em Análise',
	'Reembolsar'
] as const

export const testValidTypes = ['Normal', 'FPS', `Drop n' Go`] as const
