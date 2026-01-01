import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UsageHistory } from '../model/usageHistory'
import { localStorageUsageHistoryRepository } from '../repository/localstorageUsageHistoryRepository'
import { supabaseUsageHistoryRepository } from '../repository/supabaseUsageHistoryRepository'
import { useSession } from '@/auth/hooks/useSession'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

const QUERY_KEY = ['usage-history'] as const

interface UseUsageHistoryQueryOptions {
	onSuccess?: (data: UsageHistory) => void
	onError?: (error: Error) => void
}

export const useUsageHistoryQuery = ({ onSuccess, onError }: UseUsageHistoryQueryOptions = {}) => {
	const { session } = useSession()
	const queryClient = useQueryClient()
	const userId = session?.user.id ?? 'guest'
	const boardId = getActualBoardId()
	const fullQueryKey = [...QUERY_KEY, userId, boardId] as const

	const {
		data: usageHistory = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: fullQueryKey,
		queryFn: async (): Promise<UsageHistory> => {
			if (session) return await supabaseUsageHistoryRepository.getAll(boardId)
			return await localStorageUsageHistoryRepository.getAll()
		},
		enabled: !!userId,
		placeholderData: [],
	})

	const customMutationFn = useMutation({
		mutationFn: async (newUsageHistory: UsageHistory): Promise<UsageHistory> => {
			if (session) return await supabaseUsageHistoryRepository.save(newUsageHistory, boardId)
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
