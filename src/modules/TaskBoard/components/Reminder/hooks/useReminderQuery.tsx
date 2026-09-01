import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchReminder, saveReminder } from '../repository/ReminderRepositoryFactory'
import { useSession } from '@/auth/hooks/useSession'
import { blankReminder, Reminder } from '../model/reminder'
import { useBoardId } from '@/auth/state/store'

const reminderQueryKey = ['reminder']

export const useReminderQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()
	const boardId = useBoardId((state) => state.board_id)

	const {
		data: reminder,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: [...reminderQueryKey, session?.user.id, boardId],
		queryFn: () => fetchReminder(session, boardId),
		placeholderData: blankReminder,
	})

	const { mutate: updateReminder, isPending: isSaving } = useMutation({
		mutationFn: (updatedReminder: Reminder) =>
			saveReminder({ reminder: updatedReminder, session, boardId }),
		onMutate: async (updatedReminder: Reminder) => {
			await queryClient.cancelQueries({ queryKey: reminderQueryKey })
			const previousReminder = queryClient.getQueryData(reminderQueryKey)
			queryClient.setQueryData(reminderQueryKey, updatedReminder)
			return { previousReminder }
		},
		onError: (_err, _newReminder, context) => {
			if (context?.previousReminder) {
				queryClient.setQueryData(reminderQueryKey, context.previousReminder)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: reminderQueryKey })
		},
	})

	return {
		reminder,
		isLoading,
		isError,
		error,
		updateReminder,
		isSaving,
	}
}
