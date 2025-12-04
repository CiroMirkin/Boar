import { useTranslation } from 'react-i18next'
import { Button } from '@/ui/atoms/button'
import { useTheme } from '@/commond/hooks/useTheme'
import { toast } from 'sonner'
import { downloadArchiveLikePDF } from '@/modules/taskList/components/ArchivedTasks/downloadArchiveLikePDF'
import { useArchivedTasksQuery } from '../hooks/useArchivedTasksQuery'
import { emptyArchivedTasks } from '../models/archive'
import { useArchive } from '../hooks/useArchive'
import { useExportJson } from '@/commond/hooks/useExportJson'
import type { Archive } from '../models/archive'

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

	const { exportJson } = useExportJson<Archive>({
		filename: 'archived-tasks.json',
		indent: 2,
	})
	const handleExportJson = () => {
		const success = exportJson(archive)
		if (success) {
			toast.success(t('archive.export_success'))
		} else {
			toast.error(t('archive.export_error'))
		}
	}

	return (
		<footer className={`mb-4 p-4 rounded-lg flex flex-col gap-2 ${column}`}>
			<Button variant='outline' onClick={() => downloadArchiveLikePDF({ archive })}>
				{t('archive.archive_to_pdf_btn')}
			</Button>
			<Button variant='outline' onClick={handleExportJson}>
				{t('archive.archive_to_json_btn')}
			</Button>
			<Button variant='destructiveGhost' onClick={askForConfirmationToCleanTheWholeArchive}>
				{t('archive.clean_archive_btn')}
			</Button>
		</footer>
	)
}
