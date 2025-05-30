import { setBoar } from "@/modules/board/state/boardReducer";
import LocalStorageBoardRepository from "@/modules/board/state/localstorageBoard";
import { setColumnList } from "@/modules/columnList/state/columnListReducer";
import LocalStorageColumnListRepository from "@/modules/columnList/state/localStorageColumnList";
import { setArchive } from "@/modules/taskList/archive/state/archiveReducer";
import LocalStorageArchiveRepository from "@/modules/taskList/archive/state/localStorageArchive";
import LocalStorageTaskListInEachColumnRepository from "@/modules/taskList/state/localStorageTaskLists";
import { setTaskListInEachColumn } from "@/modules/taskList/state/taskListInEachColumnReducer";
import { Dispatch } from "@reduxjs/toolkit";

export const setTheUserBoardSavedInLocalStorage = (dispatch: Dispatch) => {
    const columnList = new LocalStorageColumnListRepository()
    dispatch(setColumnList(columnList.getAll()))

    const eachTaskList = new LocalStorageTaskListInEachColumnRepository()
    dispatch(setTaskListInEachColumn(eachTaskList.getAll()))
    
    const board = new LocalStorageBoardRepository()
    dispatch(setBoar(board.getAll().name))

    const archive = new LocalStorageArchiveRepository()
    dispatch(setArchive(archive.getAll()))
}