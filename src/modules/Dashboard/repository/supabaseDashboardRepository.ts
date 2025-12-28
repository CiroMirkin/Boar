import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { Board } from '../model/board'
import { DashboardRepository } from './dashboardRepository'
import { getUserId } from '@/auth/utils/getUserId'
import BusinessError from '@/common/errors/businessError'
import { getDefaultSupabaseBoard } from '@/auth/model/UserBoardOnSupabase'

class SupabaseDashboardRepository implements DashboardRepository {
	private readonly tableName = 'boards'
	constructor() {}

	async getBoards(): Promise<Board[]> {
		if (!isSupabaseConfigured || !supabase) return []

		const user_id = await getUserId()
		if (!user_id || user_id === undefined) {
			console.error('user_id faltante')
			return []
		}

		const { data, error } = await supabase
			.from(this.tableName)
			.select(
				`
					name,
					id,
                    created_at
				`
			)
			.eq('user_id', user_id)

		if (error) {
			console.error(error)
			return []
		}

		const boards: Board[] = data.map((board) => ({
			id: board.id,
			name: board.name,
			date: new Date(board.created_at),
		}))

		return boards || []
	}

	async deleteBoard({ boardId }: { boardId: string }): Promise<void> {
		if (!isSupabaseConfigured || !supabase || !boardId) return

		await supabase.from(this.tableName).delete().eq('id', boardId)
	}

	async createAnEmptyBoard({ name }: { name: string }): Promise<void> {
		if (!isSupabaseConfigured || !supabase || !name) return
		if (name.length <= 2 || name.length >= 15) {
			throw new BusinessError(
				'El nombre de un tablero debe tener mas de 2 caracteres y menos de 15.'
			)
		}

		const user_id = await getUserId()
		const newBoard = getDefaultSupabaseBoard({
			name,
			user_id,
		})

		const { error } = await supabase.from(this.tableName).insert(newBoard).select('id').single()

		if (error) {
			console.error(error)
			return
		}
	}
}

export const supabaseDashboard = new SupabaseDashboardRepository()
