import { TaskListArchived } from './TaskListArchived'
import { useArchive } from '../hooks/useArchive'
import { Archive } from '../models/archive'

export function Content() {
	const archive: Archive = useArchive()

	const archiveView = archive.map(({ tasklist, date }) => (
		<TaskListArchived taskList={tasklist} date={date} key={date} />
	))

	return <>{archiveView}</>
}
