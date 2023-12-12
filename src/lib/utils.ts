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
