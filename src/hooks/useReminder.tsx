import { Reminder } from "@/models/reminder";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useReminder = (): Reminder => {
    return useSelector((state: RootState) => state.config.reminder)
}