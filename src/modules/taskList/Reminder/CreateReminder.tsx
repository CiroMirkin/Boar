import { useState, ChangeEvent, useContext } from 'react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Reminder as reminder } from './reminder'
import { useToast } from '@/ui/use-toast'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { useTranslation } from 'react-i18next'
import { ReminderContext } from './ReminderContext'

interface ReminderColumn {
	name: string
	position: string
	id: string
}

function CreateReminder({ columnList }: { columnList: ReminderColumn[] }) {
	const { t } = useTranslation()
	const { reminder, setReminder } = useContext(ReminderContext)
	const [reminderText, setReminderText] = useState(reminder.text as string)
	const [reminderColumnPosition, setReminderColumnPosition] = useState(
		reminder.columnPosition as string
	)

	const { toast } = useToast()

	const handleClick = () => {
		const newReminder: reminder = {
			text: reminderText,
			columnPosition: reminderColumnPosition,
		}

		try {
			setReminder(newReminder)
			toast({
				description: t('settings.reminder.created_toast'),
				duration: 3000,
			})
		} catch (error) {
			toast({
				description: getErrorMessageForTheUser(error),
				variant: 'destructive',
				duration: 3000,
			})
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newReminderText = e.target.value
		setReminderText(newReminderText)
	}

	return (
		<>
			<h2 className='text-2xl'>{t('settings.reminder.section_title')}</h2>
			<p className='opacity-75'>{t('settings.reminder.section_description')}</p>
			<div className='py-5 grid gap-3'>
				<div className='grid mr-2 w-full items-center gap-1.5'>
					<Label>{t('settings.reminder.select_column_label')}</Label>
					<Select
						value={reminderColumnPosition}
						onValueChange={(value) => setReminderColumnPosition(value)}
					>
						<SelectTrigger className='w-full'>
							<SelectValue
								placeholder={t('settings.reminder.select_column_default_option')}
							/>
						</SelectTrigger>
						<SelectContent>
							{columnList.map((column) => (
								<SelectItem value={column.position} key={column.id}>
									{column.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='grid mr-2 w-full items-center gap-1.5'>
					<Label htmlFor='reminder-text'>
						{t('settings.reminder.reminder_description_input_label')}
					</Label>
					<Input
						type='text'
						id='reminder-text'
						value={reminderText}
						onChange={handleChange}
						placeholder={t('settings.reminder.reminder_description_input_placeholder')}
					/>
				</div>

				<Button onClick={handleClick} variant='ghost'>
					{t('settings.reminder.create_reminder_btn')}
				</Button>
			</div>
		</>
	)
}

export default CreateReminder
