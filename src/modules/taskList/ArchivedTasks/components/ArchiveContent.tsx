import { TaskListArchived } from './TaskListArchived'
import { useArchive } from '../hooks/useArchive'

export function ArchiveContent() {
	const archive = useArchive()

	const archiveView = archive.map(({ tasklist, date }) => (
		<TaskListArchived taskList={tasklist} date={date} key={date} />
	))

	return <>{archiveView}</>
}
