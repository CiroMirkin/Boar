import { Archive } from '@/modules/taskList/ArchivedTasks/models/archive'
import { jsPDF } from 'jspdf'

interface PDFConfig {
	pageMargin: number
	headerFontSize: number
	dateFontSize: number
	taskFontSize: number
	lineHeight: number
	maxCharsPerLine: number
	maxTasksPerPage: number
	initialY: number
}

const DEFAULT_CONFIG: PDFConfig = {
	pageMargin: 10,
	headerFontSize: 10,
	dateFontSize: 26,
	taskFontSize: 18,
	lineHeight: 14,
	maxCharsPerLine: 63,
	maxTasksPerPage: 12,
	initialY: 16,
}

export const downloadArchiveLikePDF = ({
	archive,
	config = DEFAULT_CONFIG,
}: {
	archive: Archive
	config?: Partial<PDFConfig>
}): void => {
	const finalConfig = { ...DEFAULT_CONFIG, ...config }
	const doc = new jsPDF('portrait')

	setupDocument(doc, finalConfig)

	archive.forEach((archiveEntry, entryIndex) => {
		if (entryIndex > 0) {
			doc.addPage('letter', 'portrait')
		}

		processArchiveEntry(doc, archiveEntry, finalConfig)
	})

	doc.save('archivo_Boar.pdf')
}

const setupDocument = (doc: jsPDF, config: PDFConfig): void => {
	doc.setTextColor('#000000')
	doc.setFontSize(config.headerFontSize)
	doc.text('Boar', config.pageMargin, 6)
}

const processArchiveEntry = (
	doc: jsPDF,
	{ date, tasklist }: { date: string; tasklist: Array<{ descriptionText: string }> },
	config: PDFConfig
): void => {
	let currentY = config.initialY

	// Add date header
	doc.setFontSize(config.dateFontSize)
	doc.text(date, config.pageMargin, currentY)
	doc.setFontSize(config.taskFontSize)

	// Process tasks
	tasklist.forEach((task, taskIndex) => {
		const linesAdded = addTaskText(
			doc,
			task.descriptionText,
			config,
			currentY + config.lineHeight,
			taskIndex
		)
		currentY += linesAdded * config.lineHeight

		// Check if we need a new page
		if (shouldAddNewPage(taskIndex, tasklist.length, config.maxTasksPerPage)) {
			doc.addPage('letter', 'portrait')
			currentY = config.initialY
		}
	})
}

const addTaskText = (
	doc: jsPDF,
	text: string,
	config: PDFConfig,
	startY: number,
	taskIndex: number
): number => {
	const bulletPoint = `${taskIndex + 1}. `
	const adjustedMaxChars = config.maxCharsPerLine - bulletPoint.length
	const lines = wrapText(text, adjustedMaxChars)
	let currentY = startY

	lines.forEach((line, lineIndex) => {
		const prefix = lineIndex === 0 ? bulletPoint : '   ' // Indent continuation lines
		doc.text(prefix + line, config.pageMargin, currentY)
		currentY += 10 // Spacing between wrapped lines
	})

	return lines.length
}

const wrapText = (text: string, maxCharsPerLine: number): string[] => {
	if (text.length <= maxCharsPerLine) {
		return [text]
	}

	const lines: string[] = []
	let remainingText = text

	while (remainingText.length > 0) {
		if (remainingText.length <= maxCharsPerLine) {
			lines.push(remainingText)
			break
		}

		// Find the best break point (prefer breaking at spaces)
		let breakPoint = maxCharsPerLine
		const lastSpaceIndex = remainingText.lastIndexOf(' ', maxCharsPerLine)

		if (lastSpaceIndex > maxCharsPerLine * 0.7) {
			breakPoint = lastSpaceIndex
		}

		lines.push(remainingText.slice(0, breakPoint))
		remainingText = remainingText.slice(breakPoint).trimStart()
	}

	return lines
}

const shouldAddNewPage = (
	currentTaskIndex: number,
	totalTasks: number,
	maxTasksPerPage: number
): boolean => {
	if (totalTasks <= maxTasksPerPage) {
		return false
	}

	// Add page at regular intervals
	const pageBreakPoints = Array.from(
		{ length: Math.ceil(totalTasks / maxTasksPerPage) },
		(_, i) => (i + 1) * maxTasksPerPage - 1
	)

	return pageBreakPoints.includes(currentTaskIndex) && currentTaskIndex < totalTasks - 1
}

// Alternative simplified version for basic use cases
export const downloadArchiveLikePDFSimple = ({ archive }: { archive: Archive }): void => {
	const doc = new jsPDF('portrait')
	doc.setTextColor('#000000')
	doc.setFontSize(8)
	doc.text('Boar', 10, 6)

	archive.forEach(({ date, tasklist }, archiveIndex) => {
		if (archiveIndex > 0) doc.addPage('letter', 'portrait')

		let yPosition = 16
		doc.setFontSize(26)
		doc.text(date, 10, yPosition)
		doc.setFontSize(18)

		tasklist.forEach(({ descriptionText }, taskIndex) => {
			yPosition += 14

			const bulletPoint = `${taskIndex + 1}. `
			const maxLength = 63 - bulletPoint.length

			// Simple text wrapping with bullet points
			if (descriptionText.length > maxLength) {
				const lines = [
					descriptionText.slice(0, maxLength),
					descriptionText.slice(maxLength, maxLength * 2).trimStart(),
					descriptionText.slice(maxLength * 2).trimStart(),
				].filter((line) => line.length > 0)

				lines.forEach((line, lineIndex) => {
					const prefix = lineIndex === 0 ? bulletPoint : '   '
					doc.text(prefix + line, 10, yPosition)
					yPosition += 10
				})
			} else {
				doc.text(bulletPoint + descriptionText, 10, yPosition)
			}

			// Page break logic
			if (tasklist.length > 12 && [11, 23, 35, 47].includes(taskIndex)) {
				doc.addPage('letter', 'portrait')
				yPosition = 16
			}
		})
	})

	doc.save('archivo_Boar.pdf')
}
