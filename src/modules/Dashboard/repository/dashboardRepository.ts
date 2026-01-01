import { Board } from '../model/board'

export interface DashboardRepository {
	getBoards(): Promise<Board[]>
	createAnEmptyBoard({ name }: { name: string }): Promise<void>
	deleteBoard({ boardId }: { boardId: string }): Promise<void>
}
