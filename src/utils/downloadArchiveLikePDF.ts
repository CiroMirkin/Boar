import { Archive } from '@/archive/models/archive'
import { jsPDF } from 'jspdf'

export const downloadArchiveLikePDF = ({ archive }: { archive: Archive }): void => {
	const doc = new jsPDF('portrait')
	doc.setTextColor('#000000')
	const INIT_Y = 16 // This is the Y Coordinate for texts

	doc.setFontSize(8)
	doc.text('Boar', 10, 6)

	archive.forEach(({ date, tasklist }) => {
		let Y = INIT_Y // This is the Y Coordinate for texts
		doc.setFontSize(26)
		doc.text(date, 10, Y)
		doc.setFontSize(18)

		tasklist.forEach(({ descriptionText }, index) => {
			Y += 14
			let line = 63 // length of the text line
			let text = descriptionText

			if (text.length >= line) {
				text = descriptionText.slice(0, line)
				doc.text(text, 10, Y)
				Y += 10

				text = descriptionText.slice(line, line * 2).trimStart()
				line = line * 2
				doc.text(text, 10, Y)
				Y += 10

				text = descriptionText.slice(line, line * 2).trimStart()
				doc.text(text, 10, Y)
			} else {
				doc.text(text, 10, Y)
			}

			// If there are more than this number of tasks, a new page must be created.
			if (tasklist.length > 12) {
				if ([12, 24, 48].includes(index)) {
					doc.addPage('letter', 'portrait')
					Y = INIT_Y
				}
			}
		})
		doc.addPage('letter', 'portrait')
	})

	doc.save('archivo_Boar.pdf')
}
