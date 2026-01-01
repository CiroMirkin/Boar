import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from '@/auth/hooks/useSession'
import {
	defaultLibraryOfArchivedNotes,
	LibraryOfArchivedNotes,
} from '../model/libraryOfArchivedNotes'
import {
	fetchLibraryOfArchivedNotes,
	saveLibraryOfArchivedNotes,
} from '../repository/libraryOfArchivedNotesRepositoryFactory'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

const libraryOfArchivedNotesQueryKey = ['libraryOfArchivedNotes']

export const useLibraryOfArchivedNotesQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()
	const boardId = getActualBoardId()
	const fullQueryKey = [...libraryOfArchivedNotesQueryKey, session?.user.id, boardId]

	const { data: archivedNotes, isLoading } = useQuery({
		queryKey: fullQueryKey,
		queryFn: () => fetchLibraryOfArchivedNotes(session),
		initialData: defaultLibraryOfArchivedNotes,
	})

	const { mutate: updateArchivedNotes, isPending: isSaving } = useMutation({
		mutationFn: (updatedNotes: LibraryOfArchivedNotes) =>
			saveLibraryOfArchivedNotes({ notes: updatedNotes, session }),
		onMutate: async (updatedNotes: LibraryOfArchivedNotes) => {
			await queryClient.cancelQueries({ queryKey: fullQueryKey })
			const previousNotes = queryClient.getQueryData(fullQueryKey)
			queryClient.setQueryData(fullQueryKey, updatedNotes)
			return { previousNotes }
		},
		onError: (_err, _newNotes, context) => {
			if (context?.previousNotes) {
				queryClient.setQueryData(fullQueryKey, context.previousNotes)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: fullQueryKey })
		},
	})

	return {
		archivedNotes,
		isLoading,
		updateArchivedNotes,
		isSaving,
	}
}
