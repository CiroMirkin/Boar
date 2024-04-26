import { columnList } from "@/models/columnList"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

export const useColumnList = (): columnList => {
    return useSelector((state: RootState) => state.columnList.list)
}