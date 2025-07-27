import { Board } from "@/modules/board/Board"
import ColumnListContainer from "@/modules/columnList/ColumnListContainer"
import { ColumnsContextContent } from "@/modules/columnList/ColumnsContext"
import { ArchiveTaskListButton } from "@/modules/taskList/archive/components/ArchiveTaskListButton"
import { AddNewTaskInput } from "@/modules/taskList/components/AddNewTaskInput"
import { TaskListInEachColumn } from "@/modules/taskList/TaskListInEachColumn"

const columnsData: ColumnsContextContent = {
    firstColumnFooterContent: <AddNewTaskInput/>,
    lastColumnFooterContent: <ArchiveTaskListButton/>,
}

export function BoardPage() {
    return (
        <Board>
            <ColumnListContainer columnsData={columnsData}>
                { TaskListInEachColumn }
            </ColumnListContainer>
        </Board>
    )
}