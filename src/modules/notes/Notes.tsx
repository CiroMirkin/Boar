import { Button } from '@/ui/atoms/button'
import { ScrollArea } from '@/ui/atoms/scroll-area'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/ui/molecules/sheet'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/common/hooks/useTheme'
import { NoteInput } from './components/NoteInput'

export default function Notes() {
	const { t } = useTranslation()
	const { column, text: textColor } = useTheme()
	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='link' className={`text-base ${textColor}`}>
						{t('notes.action_title')}
					</Button>
				</SheetTrigger>
				<SheetContent className={column}>
					<SheetHeader>
						<SheetTitle className={textColor}>{t('notes.section_title')}</SheetTitle>
						<SheetDescription aria-describedby='sheet-description'>
							{t('notes.description')}
						</SheetDescription>
					</SheetHeader>
					<ScrollArea className='h-full'>
						<main className='p-2 text-base'>
							<NoteInput />
						</main>
					</ScrollArea>
				</SheetContent>
			</Sheet>
		</>
	)
}
