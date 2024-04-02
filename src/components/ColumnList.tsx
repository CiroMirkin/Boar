import { useContext } from "react";
import { Column } from "./Column";
import { ColumnListContext, TaskListInEachColumnContext } from "./Board";
import { TaskList } from "./TaskList"
import { ScrollArea } from "../ui/scroll-area"

interface ColumnListProps { }
export function ColumnList({  }: ColumnListProps) {
    const columns = useContext(ColumnListContext)
    const taskListInEachColumn = useContext(TaskListInEachColumnContext)

    const columnList = columns.map((column, columnIndex) => {
        const taskList = taskListInEachColumn[columnIndex]
        return (
            <Column data={column} key={column.id}>
                <Column.ColumnContent className="min-h-80 md:h-[60vh] w-full" >
                    <ScrollArea className="h-full w-full rounded-md">
                        <TaskList tasks={taskList} />
                    </ScrollArea>
                </Column.ColumnContent>
                <Column.Footer/>
            </Column>
        );
    });

    return (
        <div className="h-auto pb-5 px-6 flex flex-wrap justify-stretch gap-y-3 gap-x-7">
            {columnList}
        </div>
    );
}
