import { Button } from '@/ui/atoms/button'
import { useArchive } from '@/modules/taskList/ArchivedTasks/hooks/useArchive'
import { downloadArchiveLikePDF } from '@/modules/taskList/ArchivedTasks/downloadArchiveLikePDF'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/sharedByModules/hooks/useTheme'
import { ArchiveContent } from './components/ArchiveContent'
import { toast } from 'sonner'
import { EmptySpaceText } from '@/ui/atoms/EmptySpaceText'
import { useArchivedTasksQuery } from './hooks/useArchivedTasksQuery'
import { emptyArchivedTasks } from './models/archive'

export function ArchivedTasks() {
	const { t } = useTranslation()
	const { column } = useTheme()
	const boardArchive = useArchive()

	const { updateArchivedTasks } = useArchivedTasksQuery()
	const cleanTheWholeArchive = () => {
		updateArchivedTasks(emptyArchivedTasks)
	}

	const askForConfirmationToCleanTheWholeArchive = () => {
		toast.warning(t('archive.clean_archive_warning'), {
			action: {
				label: t('archive.clean_archive_btn'),
				onClick: cleanTheWholeArchive,
			},
		})
	}

	return (
		<>
			<div className='w-full min-h-[calc(100vh-7.8rem)] grid justify-items-center py-2 pt-2 pb-6 '>
				{boardArchive.length === 0 ? (
					<EmptySpaceText> {t('archive.empty_archive')} </EmptySpaceText>
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
