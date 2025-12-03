import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchNotes, saveNotes } from '../repository/notesRepositoryFactory'
import { useSession } from '@/auth/hooks/useSession'
import { defaultNotes, Notes } from '../model/notes'

const notesQueryKey = ['notes']

export const useNotesQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()
	const fullQueryKey = [...notesQueryKey, session?.user.id]

	const { data: notes = defaultNotes, isLoading } = useQuery({
		queryKey: fullQueryKey,
		queryFn: () => fetchNotes(session),
		placeholderData: defaultNotes,
	})

	const { mutate: updateNotes, isPending: isSaving } = useMutation({
		mutationFn: (updatedNotes: Notes) => saveNotes({ notes: updatedNotes, session }),
		onMutate: async (updatedNotes: Notes) => {
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
		notes,
		isLoading,
		updateNotes,
		isSaving,
	}
}
