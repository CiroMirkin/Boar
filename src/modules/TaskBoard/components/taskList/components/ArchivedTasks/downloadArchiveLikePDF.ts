import { Archive } from '@/modules/TaskBoard/components/taskList/components/ArchivedTasks/models/archive'
import { jsPDF } from 'jspdf'

interface ArchivedTag {
	id: string
	name: string
	variant?: string
	priority?: number
}

interface ArchivedTaskColumnChange {
	date: Date
	columnName: string
}

interface ArchivedTask {
	id: string
	descriptionText: string
	tags?: ArchivedTag[]
	notesAndComments?: string
	timelineHistory?: ArchivedTaskColumnChange[]
}

interface PDFConfig {
	pageMargin: number
	headerFontSize: number
	dateFontSize: number
	taskFontSize: number
	labelFontSize: number
	contentFontSize: number
	lineHeight: number
	maxCharsPerLine: number
	initialY: number
}

const BRUTALISTA_CONFIG: PDFConfig = {
	pageMargin: 15,
	headerFontSize: 24,
	dateFontSize: 18,
	taskFontSize: 12,
	labelFontSize: 10,
	contentFontSize: 9,
	lineHeight: 6,
	maxCharsPerLine: 85,
	initialY: 35,
}

export const downloadArchiveLikePDF = ({
	archive,
	config = BRUTALISTA_CONFIG,
}: {
	archive: Archive
	config?: Partial<PDFConfig>
}): void => {
	const finalConfig = { ...BRUTALISTA_CONFIG, ...config }
	const doc = new jsPDF('portrait', 'mm', 'a4')
	const pageWidth = doc.internal.pageSize.getWidth()
	const pageHeight = doc.internal.pageSize.getHeight()

	setupBrutalistaDocument(doc, finalConfig, pageWidth, pageHeight)

	let currentY = finalConfig.initialY
	let isFirstEntry = true

	archive.forEach((archiveEntry) => {
		if (!isFirstEntry && currentY + 25 > pageHeight - 20) {
			doc.addPage('a4', 'portrait')
			setupBrutalistaDocument(doc, finalConfig, pageWidth, pageHeight)
			currentY = finalConfig.initialY
		}

		doc.setFillColor(0, 0, 0)
		doc.rect(
			finalConfig.pageMargin,
			currentY - 6,
			pageWidth - finalConfig.pageMargin * 2,
			8,
			'F'
		)
		doc.setTextColor(255, 255, 255)
		doc.setFontSize(finalConfig.dateFontSize)
		doc.setFont('helvetica', 'bold')
		doc.text(archiveEntry.date.toUpperCase(), finalConfig.pageMargin + 2, currentY)
		currentY += 15

		archiveEntry.tasklist.forEach((task) => {
			const taskHeight = calculateTaskHeight(task, finalConfig)

			if (currentY + taskHeight > pageHeight - 20) {
				doc.addPage('a4', 'portrait')
				setupBrutalistaDocument(doc, finalConfig, pageWidth, pageHeight)
				currentY = finalConfig.initialY
			}

			currentY = processTaskWithFullInfo(
				doc,
				task,
				finalConfig,
				pageWidth,
				pageHeight,
				currentY
			)
			currentY += 10
		})

		isFirstEntry = false
	})

	doc.save('archivo_Boar.pdf')
}

const setupBrutalistaDocument = (
	doc: jsPDF,
	config: PDFConfig,
	pageWidth: number,
	pageHeight: number
): void => {
	doc.setFillColor(0, 0, 0)
	doc.rect(0, 0, pageWidth, 25, 'F')

	doc.setTextColor(255, 255, 255)
	doc.setFontSize(config.headerFontSize)
	doc.setFont('helvetica', 'bold')
	doc.text('BOAR', config.pageMargin, 17)

	doc.setDrawColor(0, 0, 0)
	doc.setLineWidth(3)
	doc.rect(5, 5, pageWidth - 10, pageHeight - 10)
}

const calculateTaskHeight = (task: ArchivedTask, config: PDFConfig): number => {
	let height = 25

	const taskLines = wrapText(task.descriptionText || '', config.maxCharsPerLine - 5)
	height += taskLines.length * config.lineHeight + 5

	if (task.notesAndComments) {
		const cleanNotes = stripHtmlTags(task.notesAndComments)
		const noteLines = wrapText(cleanNotes, config.maxCharsPerLine - 5)
		height += 15 + Math.min(noteLines.length * config.lineHeight, 50)
	}

	if (task.timelineHistory && task.timelineHistory.length > 0) {
		height += 15 + Math.min(task.timelineHistory.length * 5, 60)
	}

	return height
}

const processTaskWithFullInfo = (
	doc: jsPDF,
	task: ArchivedTask,
	config: PDFConfig,
	pageWidth: number,
	pageHeight: number,
	startY: number
): number => {
	let currentY = startY

	doc.setTextColor(0, 0, 0)
	doc.setFontSize(config.taskFontSize)
	doc.setFont('helvetica', 'bold')

	let tareaHeader = 'TAREA'
	if (task.tags && task.tags.length > 0) {
		const tagNames = task.tags.map((tag: ArchivedTag) => tag.name.toUpperCase()).join(', ')
		tareaHeader = `TAREA ( ${tagNames} )`
	}
	doc.text(tareaHeader + ':', config.pageMargin, currentY)
	currentY += 6

	doc.setFont('helvetica', 'normal')
	const taskLines = wrapText(task.descriptionText || '', config.maxCharsPerLine - 5)
	taskLines.forEach((line) => {
		doc.text(line, config.pageMargin + 5, currentY)
		currentY += config.lineHeight
	})
	currentY += 5

	if (task.notesAndComments) {
		doc.setFont('helvetica', 'bold')
		doc.setFontSize(config.labelFontSize)
		doc.text('NOTAS Y COMENTARIOS:', config.pageMargin, currentY)
		currentY += 5

		doc.setFont('helvetica', 'normal')
		doc.setFontSize(config.contentFontSize)
		const cleanNotes = stripHtmlTags(task.notesAndComments)
		const noteLines = wrapText(cleanNotes, config.maxCharsPerLine - 5)

		const maxNotesLines = Math.floor((pageHeight - currentY - 30) / config.lineHeight)
		const displayLines = noteLines.slice(0, maxNotesLines)

		displayLines.forEach((line) => {
			doc.text(line, config.pageMargin + 5, currentY)
			currentY += config.lineHeight
		})
		currentY += 3
	}

	if (task.timelineHistory && task.timelineHistory.length > 0) {
		doc.setFont('helvetica', 'bold')
		doc.setFontSize(config.labelFontSize)
		doc.text('HISTORIAL:', config.pageMargin, currentY)
		currentY += 5

		doc.setFont('courier', 'normal')
		doc.setFontSize(config.contentFontSize - 1)

		const maxTimelineEntries = Math.floor((pageHeight - currentY - 15) / 5)
		const displayEntries = task.timelineHistory.slice(-maxTimelineEntries)

		displayEntries.forEach((entry: ArchivedTaskColumnChange) => {
			const formattedDate = new Date(entry.date).toLocaleString('es-AR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			})

			const timelineText = `* ${formattedDate} ------ ${entry.columnName.toUpperCase()}`
			doc.text(timelineText, config.pageMargin + 5, currentY)
			currentY += 5
		})

		currentY += 3
		doc.setDrawColor(0, 0, 0)
		doc.setLineWidth(1)
		doc.line(config.pageMargin, currentY, pageWidth - config.pageMargin, currentY)
	}

	return currentY
}

const wrapText = (text: string, maxCharsPerLine: number): string[] => {
	if (!text || text.length === 0) return []
	if (text.length <= maxCharsPerLine) return [text]

	const lines: string[] = []
	let remainingText = text

	while (remainingText.length > 0) {
		if (remainingText.length <= maxCharsPerLine) {
			lines.push(remainingText)
			break
		}

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

const stripHtmlTags = (html: string): string => {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

export const downloadArchiveLikePDFSimple = ({ archive }: { archive: Archive }): void => {
	downloadArchiveLikePDF({ archive })
}
