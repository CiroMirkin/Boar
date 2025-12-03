export const isTheSameDay = (date1: Date | number, date2: Date | number): boolean => {
	const d1 = new Date(date1)
	const d2 = new Date(date2)

	return (
		d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate()
	)
}
