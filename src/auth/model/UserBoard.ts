import { UserBoardAccessoriesOnSupabase } from './UserBoardAccessoriesOnSupabase'
import { UserBoardOnSupabase } from './UserBoardOnSupabase'

export interface UserBoard {
	board: UserBoardOnSupabase
	accessories: UserBoardAccessoriesOnSupabase
}
