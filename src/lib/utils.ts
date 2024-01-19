import type { DateAsString } from '@lib/types'
import { Test } from '@prisma/client'

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

export function getDailyReportInfo(tests: Test[] | undefined) {
	const testsInfo = tests?.map(
		test =>
			`${test.id} - ${
				test.type === 'Normal' ? formatDate(test.scheduledFor!) : test.type
			}`
	)

	return !!testsInfo ? testsInfo.join('\n') : 'N/A'
}

export const warrantyValidStatuses = ['Substituir', 'Em Análise', 'Reembolsar']

export const testValidTypes = ['Normal', 'FPS', `Drop n' Go`]
