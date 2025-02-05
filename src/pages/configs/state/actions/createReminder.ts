import BusinessError from "@/errors/businessError"
import { Reminder } from "@/models/reminder"

export const createReminder = (newReminder: Reminder) => {
    if(!newReminder.text.trim()) throw new BusinessError('El recordatorio debe tener una descripción.')
    if(!newReminder.columnPosition) throw new BusinessError('El recordatorio debe efectuarse sobre una columna.')

    return newReminder
}