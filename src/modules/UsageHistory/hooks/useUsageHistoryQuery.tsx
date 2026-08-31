'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UsageHistory } from '../model/usageHistory'
import { localStorageUsageHistoryRepository } from '../repository/localstorageUsageHistoryRepository'
import { nextjsUsageHistoryRepository } from '../repository/nextjsUsageHistoryRepository'
import { useSession } from '@/auth/hooks/useSession'
import { useBoardId } from '@/auth/state/store'

const QUERY_KEY = ['usage-history'] as const

interface UseUsageHistoryQueryOptions {
	onSuccess?: (data: UsageHistory) => void
	onError?: (error: Error) => void
}

export const useUsageHistoryQuery = ({ onSuccess, onError }: UseUsageHistoryQueryOptions = {}) => {
	const { session } = useSession()
	const queryClient = useQueryClient()
	const userId = session?.user.id ?? 'guest'
	const boardId = useBoardId((state) => state.board_id)
	const fullQueryKey = [...QUERY_KEY, userId, boardId] as const

	const {
		data: usageHistory = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: fullQueryKey,
		queryFn: async (): Promise<UsageHistory> => {
			if (session && boardId) return nextjsUsageHistoryRepository.getAll(boardId)
			return localStorageUsageHistoryRepository.getAll()
		},
		enabled: !!userId,
		placeholderData: [],
	})

	const customMutationFn = useMutation({
		mutationFn: async (newUsageHistory: UsageHistory): Promise<UsageHistory> => {
			if (session && boardId)
				return nextjsUsageHistoryRepository.save(newUsageHistory, boardId)
			return localStorageUsageHistoryRepository.save(newUsageHistory)
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
