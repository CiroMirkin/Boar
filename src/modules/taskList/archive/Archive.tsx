import { Card, CardHeader, CardTitle } from '../../../ui/card'
import { Button } from '@/ui/button'
import { useDispatch } from 'react-redux'
import { cleanArchive } from '@/modules/taskList/archive/state/archiveReducer'
import { useArchive } from '@/modules/taskList/archive/hooks/useArchive'
import { downloadArchiveLikePDF } from '@/modules/taskList/archive/downloadArchiveLikePDF'
import { useTranslation } from 'react-i18next'
import { useTheme } from "@/App"
import { ArchiveContent } from './ArchiveContent'
import { useEffect, useState } from 'react'
import { useSaveArchive } from './state/useSaveArchive'
import { useSession } from '@/SessionProvider'
import { toast } from 'sonner'

export function Archive() {
	const [ cleanArchiveSignal, setCleanArchiveSignal ] = useState(false)
	const { t } = useTranslation()
	const { column } = useTheme()
	const boardArchive = useArchive()

	const { session } = useSession()
	useEffect(() => {
		if(cleanArchiveSignal) {
            setCleanArchiveSignal(true)
                useSaveArchive({ 
					session, 
					archive: boardArchive, 
					emptyArchive: true 
            })
        } 
	}, [boardArchive])
	
	const dispatch = useDispatch()
	const cleanTheWholeArchive = () => {
		dispatch(cleanArchive())
		setCleanArchiveSignal(true)
	}
	const askForConfirmationToCleanTheWholeArchive = () => {
		toast.warning(t('archive.clean_archive_warning'), {
			action: {
				label: t('archive.clean_archive_btn'),
				onClick: cleanTheWholeArchive
			},
		})
	}

	return (
		<>
			<div className='w-full min-h-[calc(100vh-7.8rem)] grid justify-items-center py-2 pt-2 pb-6 '>
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
