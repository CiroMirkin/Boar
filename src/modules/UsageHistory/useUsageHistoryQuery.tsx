import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UsageHistory } from './model/usageHistory'
import { localStorageUsageHistoryRepository } from './repository/localstorageUsageHistoryRepository'
import { useSession } from '@/auth/hooks/useSession'

const QUERY_KEY = ['usage-history']

interface UseUsageHistoryQueryOptions {
	onSuccess?: (data: UsageHistory) => void
	onError?: (error: Error) => void
}

export const useUsageHistoryQuery = ({ onSuccess, onError }: UseUsageHistoryQueryOptions = {}) => {
	const { session } = useSession()
	const queryClient = useQueryClient()
	const userId = session?.user.id ?? 'guest'

	const fullQueryKey = [...QUERY_KEY, userId]

	const {
		data: usageHistory = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: fullQueryKey,
		queryFn: async (): Promise<UsageHistory> => {
			return await localStorageUsageHistoryRepository.getAll()
		},
		enabled: !!userId,
		placeholderData: [],
	})

	const customMutationFn = useMutation({
		mutationFn: async (newUsageHistory: UsageHistory): Promise<UsageHistory> => {
			return await localStorageUsageHistoryRepository.save(newUsageHistory)
		},
		onSuccess: (data) => {
			queryClient.setQueryData(fullQueryKey, data)
			onSuccess?.(data)
		},
		onError,
	})

	return {
		usageHistory,
		isLoading,
		isError: !!error,
		error,
		updateUsageHistory: customMutationFn.mutate,
		isSaving: customMutationFn.isPending,
	}
}
