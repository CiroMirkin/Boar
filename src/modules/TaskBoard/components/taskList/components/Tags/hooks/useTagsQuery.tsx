import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTags, saveTags } from '../repository'
import { useSession } from '@/auth/hooks/useSession'
import { TagRepositoryGetReturn } from '../repository/tagRepository'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

const tagsQueryKey = ['tags']

export const useTagsQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()

	const userId = session?.user.id ?? 'guest'
	const boardId = getActualBoardId()
	const fullQueryKey = [...tagsQueryKey, userId, boardId] as const

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
		mutationFn: (updatedTags: TagRepositoryGetReturn) =>
			saveTags({
				session,
				tags: updatedTags.tags,
				actualTags: updatedTags.actualTagGroup,
			}),
		onMutate: async (updatedTags: TagRepositoryGetReturn) => {
			await queryClient.cancelQueries({ queryKey: fullQueryKey })

			const previousTags = queryClient.getQueryData<TagRepositoryGetReturn>(fullQueryKey)

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
