import LocalStorageArchiveRepository from '@/modules/taskList/archive/state/localStorageArchive'
import { ArchiveRepository } from '@/modules/taskList/archive/models/archiveRepository'
import { Card, CardHeader, CardTitle } from '../../../ui/card'
import { Header } from '../../../sharedByModules/Header/Header'
import { USER_IS_IN } from '../../../sharedByModules/Header/userIsIn'
import { TaskListArchived } from './components/TaskListArchived'
import { Button } from '@/ui/button'
import { useDispatch } from 'react-redux'
import { cleanArchive } from '@/modules/taskList/archive/state/archiveReducer'
import { useEffect } from 'react'
import { useAskForConfirmationToast } from '@/sharedByModules/hooks/useAskForConfirmationToast'
import { useArchive } from '@/modules/taskList/archive/hooks/useArchive'
import { downloadArchiveLikePDF } from '@/modules/taskList/archive/downloadArchiveLikePDF'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/sharedByModules/Theme/ThemeContext'

const archiveRepository: ArchiveRepository = new LocalStorageArchiveRepository()

export function Archive() {
	const { t } = useTranslation()
	const { bg } = useTheme()
	const boardArchive = useArchive()

	useEffect(() => archiveRepository.save(boardArchive), [boardArchive])

	const archive = boardArchive.map(({ tasklist, date }) => (
		<TaskListArchived taskList={tasklist} date={date} key={date} />
	))

	const dispatch = useDispatch()

	const cleanTheWholeArchive = () => dispatch(cleanArchive())
	const askForConfirmationToCleanTheWholeArchive = useAskForConfirmationToast({
		confirmationText: t('archive.clean_archive_warning'),
		action: cleanTheWholeArchive,
	})

	return (
		<div className={bg}>
			<Header title={t('menu.archive')} whereUserIs={USER_IS_IN.ARCHIVE} />
			<div className='w-full min-h-[calc(100vh-6rem)] px-6 py-2 pt-2 pb-6 flex flex-col gap-y-2'>
				{archive.length === 0 ? (
					<EmptyArchive />
				) : (
					<>
						<>{archive}</>
						<Button
							variant='ghost'
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
					</>
				)}
			</div>
		</div>
	)
}

function EmptyArchive() {
	const { t } = useTranslation()
	const { column } = useTheme()
	return (
		<Card className={`y-2 px-4 rounded-lg ${column}`}>
			<CardHeader>
				<CardTitle>{t('archive.empty_archive')}</CardTitle>
			</CardHeader>
		</Card>
	)
}
