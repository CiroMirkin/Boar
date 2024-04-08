import { useContext } from "react";
import { taskModel } from "../models/task";
import { getIndexOfColumnInColumnList, isThisTheLastColumn } from "@/models/column";
import { ColumnListContext } from "../components/board/Board";

export function isThisTaskInTheLastColumn(task: taskModel): boolean {
    const columnList = useContext(ColumnListContext);
    const columnIndex = getIndexOfColumnInColumnList(task.columnPosition);
    const column = columnList[columnIndex];
    return isThisTheLastColumn(column, columnList);
}