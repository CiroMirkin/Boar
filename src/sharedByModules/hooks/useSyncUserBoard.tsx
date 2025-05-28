import { supabase } from "@/lib/supabase"
import { defaultBoard } from "@/modules/board/models/board"
import { setBoar } from "@/modules/board/state/boardReducer"
import { ColumnList, defaultColumnList } from "@/modules/columnList/models/columnList"
import { setColumnList } from "@/modules/columnList/state/columnListReducer"
import { emptyTaskListInEachColumn, TaskListInEachColumn } from "@/modules/taskList/models/taskList"
import { setTaskListInEachColumn } from "@/modules/taskList/state/taskListInEachColumnReducer"
import { store } from "@/store"
import { Dispatch } from "@reduxjs/toolkit"

const sendForSaveUserBoard = async (userBoard: UserBoard) => {
	try {
		const { error } = await supabase
			.from('boards')
			.insert(userBoard)
		if(error) throw error
	}
	catch(e) {
		console.error(e)
	}
}

interface UserBoard {
    name: string;
    column_list: ColumnList;
    task_list_in_each_column: TaskListInEachColumn;
    user_id: string | undefined;
}

const changeActualBoardBySavedBoard = (
    { dispatch, savedUserBoard }: { dispatch: Dispatch, savedUserBoard: UserBoard }
) => {
    dispatch(setTaskListInEachColumn(savedUserBoard.task_list_in_each_column))
    dispatch(setBoar(savedUserBoard.name))
    dispatch(setColumnList(savedUserBoard.column_list))
}

export const getUserId  = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user?.id
} 

const getActualUserBoard = async (): Promise<UserBoard> => ({
	name: store.getState().board.board.name,
	column_list: store.getState().columnList.list,
	task_list_in_each_column: store.getState().taskListInEachColumn.list,
	user_id: await getUserId()
})

/** @returns True si el usuario tiene el tablero por defecto (vacio) */
export const checkIfUserHasTheDefaultBoard = async (): Promise<Boolean> => {
    const actualUserBoard = await getActualUserBoard()
	return actualUserBoard.name === defaultBoard.name 
        && JSON.stringify(actualUserBoard.column_list) === JSON.stringify(defaultColumnList) 
        && JSON.stringify(actualUserBoard.task_list_in_each_column) === JSON.stringify(emptyTaskListInEachColumn) 
}

/** Recupera el tablero del usuario de Supabase y si no existe ninguno guarda el tablero actual en Supabase. */
export const useSyncUserBoard = async (dispatch: Dispatch) => {
    const actualUserBoard = await getActualUserBoard()
    const { data } = await supabase
        .from('boards')
        .select('*')

    if(data != null && data.length === 0){
        sendForSaveUserBoard(actualUserBoard)
    }
    else if (data != null) {
        const savedUserBoard = data[0]
        const hasUserDefaultBoard = await checkIfUserHasTheDefaultBoard()
        if(hasUserDefaultBoard) {
            changeActualBoardBySavedBoard({ dispatch, savedUserBoard })
        }
        else {
            // Remplaza el tablero actual por el tablero de Supabase
           changeActualBoardBySavedBoard({ dispatch, savedUserBoard })
        }
    }
}