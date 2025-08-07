import { Board } from "@/modules/board/Board"
import { ColumnsContextContent, ColumnsProvider } from "@/modules/columnList/ColumnsContext"
import { ArchiveTaskListButton } from "@/modules/taskList/ArchivedTasks/components/ArchiveTaskListButton"
import { AddNewTaskInput } from "@/modules/taskList/components/AddNewTaskInput"
import { TaskListInEachColumn } from "@/modules/taskList/TaskListInEachColumn"
import PageContainer from "./PageContainer"
import { useBoard } from "@/modules/board/hooks/useBoard"
import { USER_IS_IN } from "@/modules/Header/userIsIn"
import { ListView } from "@/modules/columnList/components/ListView"
import { TableView } from "@/modules/columnList/components/TableView"
import { useTypeOfView } from "@/modules/TypeOfView/useTypeOfView"
import { NoteInput } from "@/modules/notes/components/NoteInput"

const columnsData: ColumnsContextContent = {
    firstColumnFooterContent: <AddNewTaskInput/>,
    lastColumnFooterContent: <ArchiveTaskListButton/>,
}

export function BoardPage() {
    const data = useBoard()
    const typeOfView = useTypeOfView()
    return (
        <PageContainer title={data.name} whereUserIs={USER_IS_IN.BOARD}>
            <Board>
                <ColumnsProvider value={columnsData}>
                    {
                        typeOfView == 'LIST' && <div className="p-5">
                            <ListView>{ TaskListInEachColumn }</ListView>
                        </div>
                    }
                    {
                        typeOfView == 'BOARD' && <TableView>{ TaskListInEachColumn }</TableView>
                    }
                    {
                        typeOfView == 'NOTE-LIST' && <div className="flex md:flex-nowrap flex-wrap-reverse justify-stretch items-start gap-4 py-4 px-8 md:px-20">
                            <ListView>{ TaskListInEachColumn }</ListView>
                            <div className="w-full">
                                <NoteInput />
                            </div>
                        </div>
                    }
                </ColumnsProvider>
            </Board>
        </PageContainer>
    )
}