import { useContext } from "react"
import { ReminderContext } from "./ReminderContext"
import { Button } from "@/ui/button"
import { Trash } from "lucide-react"
import { iconSize } from "@/sharedByModules/configs/iconsConstants"
import { blankReminder } from "./reminder"
import { useAskForConfirmationToast } from "@/sharedByModules/hooks/useAskForConfirmationToast"
import { useTranslation } from "react-i18next"

export function ReminderList(){
    const { t } = useTranslation()
    return (
        <div>
            <h2 className='text-2xl mb-4'>{ t('settings.reminder.reminder_list_section_title') }</h2>
            <ul>
                { getReminderList() }
            </ul>
        </div>
    )
} 

const getReminderList = () => {
    const t = useTranslation().t
    const { reminder, setReminder } = useContext(ReminderContext)

    const deleteReminder = () => {
        setReminder(blankReminder)
    }

    const askForConfirmationToDeleteTheReminder = useAskForConfirmationToast({
        confirmationText: t('settings.reminder.delete_reminder_warning_toast'),
        action: deleteReminder
    })

    const reminderList = (
        <li className='w-full py-1 px-3 flex flex-col gap-2 content-stretch border rounded-md'>
            <div className="w-full flex justify-between items-center gap-2">
                <p className="text-xl">{ reminder.text }</p>
                <Button variant='destructiveGhost' title={t('settings.reminder.delete_reminder_btn')} onClick={askForConfirmationToDeleteTheReminder}>
                <Trash size={iconSize} />
                </Button>
            </div>
        </li>
    )

    const blankReminderList = (
        <p className="w-full py-1 px-3 opacity-75 border rounded-md">
            {t('settings.reminder.blank_reminder_list')}
        </p>
    )

    return !reminder.text ? blankReminderList : reminderList
}