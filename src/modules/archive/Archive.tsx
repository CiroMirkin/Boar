import LocalStorageArchiveRepository from '@/modules/archive/state/localStorageArchive'
import { ArchiveRepository } from '@/modules/archive/models/archiveRepository'
import { Card, CardHeader, CardTitle } from '../../ui/card'
import { Header } from '../shared/components/Header'
import { USER_IS_IN } from '../shared/components/userIsIn'
import { TaskListArchived } from './components/TaskListArchived'
import { Button } from '@/ui/button'
import { useDispatch } from 'react-redux'
import { cleanArchive } from '@/modules/archive/state/archiveReducer'
import { useEffect } from 'react'
import { useAskForConfirmationToast } from '@/modules/shared/hooks/useAskForConfirmationToast'
import { useArchive } from '@/modules/archive/hooks/useArchive'
import { downloadArchiveLikePDF } from '@/modules/shared/utils/downloadArchiveLikePDF'
import { useTranslation } from 'react-i18next'

const archiveRepository: ArchiveRepository = new LocalStorageArchiveRepository()

export function Archive() {
	const { t } = useTranslation()
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
		<>
			<Header title={t('menu.archive')} whereUserIs={USER_IS_IN.ARCHIVE} />
			<div className='mx-6 my-4 flex flex-col gap-y-2'>
				{archive.length === 0 ? (
					<EmptyArchive />
				) : (
					<>
						<>{archive}</>
						<Button
							variant='ghost'
							onClick={() => downloadArchiveLikePDF({ archive: boardArchive })}
						>
							{ t('archive.archive_to_pdf_btn') }
						</Button>
						<Button
							variant='destructiveGhost'
							onClick={askForConfirmationToCleanTheWholeArchive}
						>
							{ t('archive.clean_archive_btn') }
						</Button>
					</>
				)}
			</div>
		</>
	)
}

function EmptyArchive() {
	const { t } = useTranslation()
	return (
		<Card className='py-2 px-4'>
			<CardHeader>
				<CardTitle>{ t('archive.empty_archive') }</CardTitle>
			</CardHeader>
		</Card>
	)
}
