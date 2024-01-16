import { DateAsString } from '@lib/types'

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

export function isEveryFieldFilled(obj: { [key: string]: unknown }) {
	return Object.values(obj).every(Boolean)
}

export function addThirtyDays(date: Date) {
	const newDate = new Date(date)
	newDate.setDate(newDate.getDate() + 30)
	return newDate
}

export function isBetweenMinMax(value: number, min: number, max: number) {
	return value >= min && value <= max
}

export const warrantyValidStatuses = ['Substituir', 'Em Análise', 'Reembolsar']

export const testValidTypes = ['Normal', 'FPS', `Drop n' Go`]
