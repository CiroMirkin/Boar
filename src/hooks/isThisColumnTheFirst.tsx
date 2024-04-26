import { ColumnListContext } from "@/components/board/Board";
import { Column, isThisTheFirstColumn } from "@/models/column";
import { useContext } from "react";

export function useCheckIfThisColumnIsTheFirst( column: Column): boolean {
    const columnList = useContext(ColumnListContext)
    return isThisTheFirstColumn(column, columnList)
}