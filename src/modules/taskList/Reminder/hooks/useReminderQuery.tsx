import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchReminder, saveReminder } from '../repository/ReminderRepositoryFactory'
import { useSession } from '@/auth/hooks/useSession'
import { Reminder } from '../reminder'

const reminderQueryKey = ['reminder']

export const useReminderQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()

	const {
		data: reminder,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: [...reminderQueryKey, session?.user.id],
		queryFn: () => fetchReminder(session),
	})

	const { mutate: updateReminder, isPending: isSaving } = useMutation({
		mutationFn: (updatedReminder: Reminder) =>
			saveReminder({ reminder: updatedReminder, session }),
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
