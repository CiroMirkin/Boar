import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchColumnList, saveColumnList } from '../repository'
import { useSession } from '@/auth/hooks/useSession'
import { ColumnList, defaultColumnList, isDefaultColumnList } from '../models/columnList'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

const columnListQueryKey = ['columnList']

export const useColumnListQuery = () => {
	const { session } = useSession()
	const queryClient = useQueryClient()
	const { t, i18n } = useTranslation()

	const select = useCallback(
		(rawData: ColumnList | undefined) => {
			const data = rawData ?? defaultColumnList
			if (isDefaultColumnList(data)) {
				return data.map((column) => ({
					...column,
					name: t(`default_columns.${column.id}`),
				}))
			}
			return data
		},
		[t, i18n.language] // eslint-disable-line react-hooks/exhaustive-deps
	)

	const {
		data: columnList,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: [...columnListQueryKey, session?.user.id],
		queryFn: () => fetchColumnList(session),
		initialData: defaultColumnList,
		select,
	})

	const { mutate: updateColumnList, isPending: isSaving } = useMutation({
		mutationFn: (updatedColumnList: ColumnList) =>
			saveColumnList({ columnList: updatedColumnList, session }),
		onMutate: async (updatedColumnList: ColumnList) => {
			await queryClient.cancelQueries({ queryKey: columnListQueryKey })
			const previousColumnList = queryClient.getQueryData(columnListQueryKey)
			queryClient.setQueryData(columnListQueryKey, updatedColumnList)
			return { previousColumnList }
		},
		onError: (_err, _newColumnList, context) => {
			if (context?.previousColumnList) {
				queryClient.setQueryData(columnListQueryKey, context.previousColumnList)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: columnListQueryKey })
		},
	})

	return {
		columnList,
		isLoading,
		isError,
		error,
		updateColumnList,
		isSaving,
	}
}
