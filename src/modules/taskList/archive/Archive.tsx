import { Card, CardHeader, CardTitle } from '../../../ui/card'
import { Button } from '@/ui/button'
import { useDispatch } from 'react-redux'
import { cleanArchive } from '@/modules/taskList/archive/state/archiveReducer'
import { useAskForConfirmationToast } from '@/sharedByModules/hooks/useAskForConfirmationToast'
import { useArchive } from '@/modules/taskList/archive/hooks/useArchive'
import { downloadArchiveLikePDF } from '@/modules/taskList/archive/downloadArchiveLikePDF'
import { useTranslation } from 'react-i18next'
import { useTheme } from "@/App"
import { ArchiveContent } from './ArchiveContent'

export function Archive() {
	const { t } = useTranslation()
	const { column } = useTheme()
	const boardArchive = useArchive()
	
	const dispatch = useDispatch()
	const cleanTheWholeArchive = () => dispatch(cleanArchive())
	const askForConfirmationToCleanTheWholeArchive = useAskForConfirmationToast({
		confirmationText: t('archive.clean_archive_warning'),
		action: cleanTheWholeArchive,
	})

	return (
		<>
			<div className='w-full min-h-[calc(100vh-5rem)] grid justify-items-center py-2 pt-2 pb-6 '>
				{boardArchive.length === 0 ? (
					<EmptyArchive />
				) : (
					<div className='max-w-3xl flex flex-col gap-y-2'>
						<ArchiveContent />
						<footer className={`mb-4 p-4 rounded-lg flex flex-col gap-2 ${column}`}>
							<Button
								variant='outline'
								onClick={() => downloadArchiveLikePDF({ archive: boardArchive })}
							>
								{t('archive.archive_to_pdf_btn')}
							</Button>
							<Button
								variant='destructiveGhost'
								onClick={askForConfirmationToCleanTheWholeArchive}
							>
								{t('archive.clean_archive_btn')}
							</Button>
						</footer>
					</div>
				)}
			</div>
		</>
	)
}

function EmptyArchive() {
	const { t } = useTranslation()
	const { column } = useTheme()
	return (
		<Card className={`h-fit px-4 rounded-lg ${column}`}>
			<CardHeader>
				<CardTitle className='text-lg opacity-60'>{t('archive.empty_archive')}</CardTitle>
			</CardHeader>
		</Card>
	)
}
