import { ColumnListContext } from "@/components/board/Board";
import { columnModel, isThisTheLastColumn } from "@/models/column";
import { useContext } from "react";

export function useCheckIfThisColumnIsTheLast(column: columnModel): boolean {
    const columnList = useContext(ColumnListContext)
    return isThisTheLastColumn(column, columnList)
}