import { useTranslation } from 'react-i18next'
import { Button } from '@/ui/atoms/button'
import { useTheme } from '@/sharedByModules/hooks/useTheme'
import { toast } from 'sonner'
import { downloadArchiveLikePDF } from '@/modules/taskList/ArchivedTasks/downloadArchiveLikePDF'
import { useArchivedTasksQuery } from '../hooks/useArchivedTasksQuery'
import { emptyArchivedTasks } from '../models/archive'
import { useArchive } from '../hooks/useArchive'

export default function Footer() {
	const archive = useArchive()
	const { column } = useTheme()
	const { t } = useTranslation()

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
		<footer className={`mb-4 p-4 rounded-lg flex flex-col gap-2 ${column}`}>
			<Button variant='outline' onClick={() => downloadArchiveLikePDF({ archive })}>
				{t('archive.archive_to_pdf_btn')}
			</Button>
			<Button variant='destructiveGhost' onClick={askForConfirmationToCleanTheWholeArchive}>
				{t('archive.clean_archive_btn')}
			</Button>
		</footer>
	)
}
