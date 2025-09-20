import { TaskListArchived } from './TaskListArchived'
import { useSession } from '@/auth/hooks/useSession'
import { useEffect } from 'react'
import { useArchive } from '../hooks/useArchive'
import { useSaveArchive } from '../state/useSaveArchive'

export function ArchiveContent() {
	const archive = useArchive()

	const { session } = useSession()
	const saveArchive = useSaveArchive()
	useEffect(() => {
		saveArchive({ session, archive })
	}, [archive, session, saveArchive])

	const archiveView = archive.map(({ tasklist, date }) => (
		<TaskListArchived taskList={tasklist} date={date} key={date} />
	))

	return <>{archiveView}</>
}
