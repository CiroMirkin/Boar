import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AvailableTags } from "../model/tags";

export const useAvailableTags = (): AvailableTags => {
    return useSelector((state: RootState) => state.tags.list)
}