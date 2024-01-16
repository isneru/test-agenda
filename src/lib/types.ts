export type DateAsString = {
	date: {
		year: string
		month: string
		day: string
	}
	time: {
		hours: string
		minutes: string
	}
}

export type InputEvent = React.ChangeEvent<
	HTMLInputElement | HTMLTextAreaElement
>
