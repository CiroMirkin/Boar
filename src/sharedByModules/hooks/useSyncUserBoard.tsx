import { supabase } from "@/lib/supabase"
import { defaultBoard } from "@/modules/board/models/board"
import { ColumnList, defaultColumnList } from "@/modules/columnList/models/columnList"
import { emptyTaskListInEachColumn, TaskListInEachColumn } from "@/modules/taskList/models/taskList"
import { store } from "@/store"
import { toast } from "sonner"

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

const getUserId  = async () => {
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
const checkIfUserHasTheDefaultBoard = (actualUserBoard: UserBoard): boolean => {
	return actualUserBoard.name === defaultBoard.name 
        && JSON.stringify(actualUserBoard.column_list) === JSON.stringify(defaultColumnList) 
        && JSON.stringify(actualUserBoard.task_list_in_each_column) === JSON.stringify(emptyTaskListInEachColumn) 
}

/** Recupera el tablero del usuario de Supabase y si no existe ninguno guarda el tablero actual en Supabase. */
export const useSyncUserBoard = async () => {
    const actualUserBoard = await getActualUserBoard()
    const { data } = await supabase
        .from('boards')
        .select('*')

    if(data != null && data.length === 0){
        sendForSaveUserBoard(actualUserBoard)
    }
    else if (data != null) {
        const savedUserBoard = data[0]
        const hasUserDefaultBoard = checkIfUserHasTheDefaultBoard(actualUserBoard)
        if(hasUserDefaultBoard) {
            console.log('El tablero actual se deberia guardar dentro de supabase')
        }
        else {
            // Preguntar si desea remplazar el tablero actual por el tablero de Supabase
            const toastText = 'El tablero actual no coincide con el tablero guardado en su cuenta ¿Desea remplazarlo?'
            toast(toastText, {
                duration: Infinity,
                action: {
                    label: 'Remplazar',
                    onClick: () => { console.log('El tablero actual se deberia remplazar por el tablero guardado en Supabase', savedUserBoard)},
                }
            })
        }
    }
}