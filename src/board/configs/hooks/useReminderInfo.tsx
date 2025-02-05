import { RootState } from "@/redux/store";
import { Reminder } from "../models/reminder";
import { useSelector } from "react-redux";

/** Proporciona toda la información del recordatorio creado por el usuario. */
export const useReminderInfo = (): Reminder => {
    return useSelector((state: RootState) => state.config.reminder)
}