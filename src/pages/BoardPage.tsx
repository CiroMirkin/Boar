import { Board } from "@/modules/board/Board"
import ColumnListContainer from "@/modules/columnList/ColumnListContainer"
import { ColumnsContextContent } from "@/modules/columnList/ColumnsContext"
import { ArchiveTaskListButton } from "@/modules/taskList/archive/components/ArchiveTaskListButton"
import { AddNewTaskInput } from "@/modules/taskList/components/AddNewTaskInput"
import { TaskListInEachColumn } from "@/modules/taskList/TaskListInEachColumn"
import PageContainer from "./PageContainer"
import { useBoard } from "@/modules/board/hooks/useBoard"
import { USER_IS_IN } from "@/sharedByModules/Header/userIsIn"

const columnsData: ColumnsContextContent = {
    firstColumnFooterContent: <AddNewTaskInput/>,
    lastColumnFooterContent: <ArchiveTaskListButton/>,
}

export function BoardPage() {
    const data = useBoard()
    return (
        <PageContainer title={data.name} whereUserIs={USER_IS_IN.BOARD}>
            <Board>
                <ColumnListContainer columnsData={columnsData}>
                    { TaskListInEachColumn }
                </ColumnListContainer>
            </Board>
        </PageContainer>
    )
}