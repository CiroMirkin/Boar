import { Board } from '@/modules/Dashboard/model/board'
import { DashboardRepository } from './dashboardRepository'
import { getBoards, createBoard, deleteBoard } from '@/actions/board'

export default class NextjsDashboardRepository implements DashboardRepository {
	async getBoards(): Promise<Board[]> {
		return getBoards()
	}

	async createAnEmptyBoard({ name }: { name: string }): Promise<void> {
		return createBoard({ name })
	}

	async deleteBoard({ boardId }: { boardId: string }): Promise<void> {
		return deleteBoard({ boardId })
	}
}
