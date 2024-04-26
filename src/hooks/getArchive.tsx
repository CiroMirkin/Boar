import { Archive } from "@/models/archive"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

export const useArchive = (): Archive => {
    return useSelector((state: RootState) => state.archive.list)
}