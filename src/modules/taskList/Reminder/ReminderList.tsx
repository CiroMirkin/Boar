import { useContext } from "react"
import { ReminderContext } from "./ReminderContext"
import { Button } from "@/ui/atoms/button"
import { TrashIcon } from "@/ui/icons"
import { blankReminder } from "./reminder"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { useTheme } from "@/App"
import { EmptySpaceText } from "@/ui/EmptySpaceText"

export function ReminderList(){
    const { t } = useTranslation()
    return (
        <div>
            <h2 className='text-2xl mb-4'>{ t('settings.reminder.reminder_list_section_title') }</h2>
            <ul>
                <ReminderListContainer />
            </ul>
        </div>
    )
} 

const ReminderListContainer = () => {
    const t = useTranslation().t
    const { reminder, setReminder } = useContext(ReminderContext)

    const deleteReminder = () => {
        setReminder(blankReminder)
    }

    const askForConfirmationToDeleteTheReminder = () => {
        toast.warning(t('settings.reminder.delete_reminder_warning_toast'), {
            action: {
				label: t('settings.reminder.delete_reminder_btn'),
				onClick: deleteReminder
			},
        })
    }

    const { task } = useTheme() 
    const reminderList = (
        <li className={`w-full py-1 px-3 flex flex-col gap-2 content-stretch rounded-md ${task}`}>
            <div className="w-full flex justify-between items-center gap-2">
                <p className="text-lg">{ reminder.text }</p>
                <Button variant='destructiveGhost' title={t('settings.reminder.delete_reminder_btn')} onClick={askForConfirmationToDeleteTheReminder}>
                <TrashIcon />
                </Button>
            </div>
        </li>
    )

    const blankReminderList = (
        <EmptySpaceText className={`py-2 px-3 border rounded-md ${task}`} textSize="lg">
            {t('settings.reminder.blank_reminder_list')}
        </EmptySpaceText>
    )

    return !reminder.text ? blankReminderList : reminderList
}