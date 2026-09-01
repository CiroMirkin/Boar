import { Board } from '@/modules/Dashboard/model/board'
import { DashboardRepository } from './dashboardRepository'

export default class NextjsDashboardRepository implements DashboardRepository {
	async getBoards(): Promise<Board[]> {
		const { getBoards } = await import('@/actions/board')
		return getBoards()
	}

	async createAnEmptyBoard({ name }: { name: string }): Promise<void> {
		const { createBoard } = await import('@/actions/board')
		return createBoard({ name })
	}

	async deleteBoard({ boardId }: { boardId: string }): Promise<void> {
		const { deleteBoard } = await import('@/actions/board')
		return deleteBoard({ boardId })
	}
}
