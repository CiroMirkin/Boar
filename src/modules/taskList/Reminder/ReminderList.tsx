import { useContext } from "react"
import { ReminderContext } from "./ReminderContext"
import { Button } from "@/ui/button"
import { Trash } from "lucide-react"
import { iconSize } from "@/sharedByModules/configs/iconsConstants"
import { blankReminder } from "./reminder"
import { useAskForConfirmationToast } from "@/sharedByModules/hooks/useAskForConfirmationToast"

export function ReminderList(){
    return (
        <div>
            <h2 className='text-2xl mb-4'>Recordatorios creados</h2>
            <ul>
                { getReminderList() }
            </ul>
        </div>
    )
} 

const getReminderList = () => {
    const { reminder, setReminder } = useContext(ReminderContext)

    const deleteReminder = () => {
        setReminder(blankReminder)
    }

    const askForConfirmationToDeleteTheReminder = useAskForConfirmationToast({
        confirmationText: '¿Seguro desea eliminar este recordatorio?',
        action: deleteReminder
    })

    const reminderList = (
        <li className='w-full py-1 px-3 flex flex-col gap-2 content-stretch border rounded-md'>
            <div className="w-full flex justify-between items-center gap-2">
                <p className="text-xl">{ reminder.text }</p>
                <Button variant='destructiveGhost' title='Eliminar recordatorio' onClick={askForConfirmationToDeleteTheReminder}>
                <Trash size={iconSize} />
                </Button>
            </div>
        </li>
    )

    const blankReminderList = (
        <p className="w-full py-1 px-3 opacity-75 border rounded-md">
            Aún no haz creado ningun recordatorio.
        </p>
    )

    return !reminder.text ? blankReminderList : reminderList
}