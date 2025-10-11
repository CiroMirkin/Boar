import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchNotes, saveNotes } from '../repository/notesRepositoryFactory'
import { useSession } from '@/auth/hooks/useSession'
import { Notes } from '../model/notes'

const notesQueryKey = ['notes']

export const useNotesQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()

	const { data: notes, isLoading } = useQuery({
		queryKey: [...notesQueryKey, session?.user.id],
		queryFn: () => fetchNotes(session),
	})

	const { mutate: updateNotes, isPending: isSaving } = useMutation({
		mutationFn: (updatedNotes: Notes) => saveNotes({ notes: updatedNotes, session }),
		onMutate: async (updatedNotes: Notes) => {
			await queryClient.cancelQueries({ queryKey: notesQueryKey })
			const previousNotes = queryClient.getQueryData(notesQueryKey)
			queryClient.setQueryData(notesQueryKey, updatedNotes)
			return { previousNotes }
		},
		onError: (_err, _newNotes, context) => {
			if (context?.previousNotes) {
				queryClient.setQueryData(notesQueryKey, context.previousNotes)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: notesQueryKey })
		},
	})

	return {
		notes,
		isLoading,
		updateNotes,
		isSaving,
	}
}
