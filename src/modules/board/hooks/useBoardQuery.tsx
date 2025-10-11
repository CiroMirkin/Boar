import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchBoard, saveBoard } from '../repository/boardRepository'
import { useSession } from '@/auth/hooks/useSession'
import { boardModel } from '../models/board'

const boardQueryKey = ['board']

export const useBoardQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()

	const {
		data: board,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: [...boardQueryKey, session?.user.id],
		queryFn: () => fetchBoard(session),
	})
	const { mutate: updateBoard, isPending: isSaving } = useMutation({
		mutationFn: (updatedBoard: boardModel) => saveBoard({ board: updatedBoard, session }),
		onMutate: async (updatedBoard: boardModel) => {
			await queryClient.cancelQueries({ queryKey: boardQueryKey })
			const previousBoard = queryClient.getQueryData(boardQueryKey)
			queryClient.setQueryData(boardQueryKey, updatedBoard)
			return { previousBoard }
		},
		onError: (_err, _newBoard, context) => {
			if (context?.previousBoard) {
				queryClient.setQueryData(boardQueryKey, context.previousBoard)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: boardQueryKey })
		},
	})

	return {
		board,
		isLoading,
		isError,
		error,
		updateBoard,
		isSaving,
	}
}
