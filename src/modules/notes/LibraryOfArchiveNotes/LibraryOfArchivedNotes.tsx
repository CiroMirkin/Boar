import { useTheme } from '@/App'
import { ListOfArchivedNotes } from './components/ListOfArchivedNotes'

export default function LibraryOfArchiveNotes() {
	const { bg } = useTheme()
	const className = `w-full min-h-[calc(100vh-7.8rem)] p-4 flex flex-col gap-4 items-center ${bg}`
	return (
		<main className={className}>
			<ListOfArchivedNotes />
		</main>
	)
}
