import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTags, saveTags } from '../repository'
import { useSession } from '@/auth/hooks/useSession'
import { AvailableTags } from '../model/tags'

const tagsQueryKey = ['tags']

export const useTagsQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()

	const userId = session?.user.id ?? 'guest'
	const fullQueryKey = [...tagsQueryKey, userId]

	const {
		data: tags,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: fullQueryKey,
		queryFn: () => fetchTags(session),
	})

	const { mutate: updateTags, isPending: isSaving } = useMutation({
		mutationFn: (updatedTags: AvailableTags) => saveTags({ tags: updatedTags, session }),
		onMutate: async (updatedTags: AvailableTags) => {
			await queryClient.cancelQueries({ queryKey: fullQueryKey })

			const previousTags = queryClient.getQueryData<AvailableTags>(fullQueryKey)

			queryClient.setQueryData(fullQueryKey, updatedTags)

			return { previousTags }
		},
		onError: (_err, _newTags, context) => {
			if (context?.previousTags) {
				queryClient.setQueryData(fullQueryKey, context.previousTags)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: fullQueryKey })
		},
	})

	return {
		tags,
		isLoading,
		isError,
		error,
		updateTags,
		isSaving,
	}
}
