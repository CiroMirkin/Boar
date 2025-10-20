import { Card, CardContent, CardHeader, CardTitle } from '@/ui/molecules/card'
import { ArchivedNote as ArchivedNoteModel } from '../model/archivedNote'
import { useTheme } from '@/sharedByModules/hooks/useTheme'
import { MinimalTiptapViewer } from '@/ui/organisms/MinimalTiptapViewer'

interface ArchivedNoteProps {
	note: ArchivedNoteModel
}

export default function ArchivedNote({ note }: ArchivedNoteProps) {
	const { column, task, text, taskText } = useTheme()
	const archivedNoteClassName = `${column} ${text} border-none md:px-6 px-4 max-w-2xl rounded-lg`
	return (
		<Card className={archivedNoteClassName}>
			<CardHeader>
				<CardTitle className='text-2xl'>{note.date}</CardTitle>
			</CardHeader>
			<CardContent className='h-auto'>
				<MinimalTiptapViewer
					value={note.note}
					className={`${task} ${taskText ? taskText : text}`}
				/>
			</CardContent>
		</Card>
	)
}
