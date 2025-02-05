import { useState, ChangeEvent } from "react"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui/select"
import { Reminder as reminder } from "../models/reminder"
import { useToast } from "@/ui/use-toast"
import { useDispatch } from "react-redux"
import { addReminder } from "@/columnList/state/columnListReducer"
import getErrorMessageForTheUser from "@/utils/getErrorMessageForTheUser"
import { useReminderInfo } from "@/columnList/hooks/useReminderInfo"
import { useColumnList } from "@/columnList/hooks/useColumnList"

function Reminder({ }) {
    const columnList = useColumnList()
    const reminder = useReminderInfo()
    const [reminderText, setReminderText] = useState(reminder.text as string)
    const [reminderColumnPosition, setReminderColumnPosition] = useState(reminder.columnPosition as string)
    const dispatch = useDispatch()

    const { toast } = useToast()

    const handleClick = () => {
        const newReminder: reminder = {
            text: reminderText,
            columnPosition: reminderColumnPosition
        }

        try {
			dispatch(addReminder(newReminder))
            toast({
				description: "Recordatorio creado!",
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
            <h2 className='text-2xl'>Crear recordatorio</h2>
			<p className="opacity-75">Cada vez que una tarea llegué a la columna indicada se mostrara el recordatorio en pantalla.</p>
            <div className="max-w-2xl py-5 grid gap-3">
                <div className='grid mr-2 w-full items-center gap-1.5'>
                    <Label>Selecciona una columna</Label>
                    <Select value={reminderColumnPosition} onValueChange={(value) => setReminderColumnPosition(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Columnas" />
                        </SelectTrigger>
                        <SelectContent>
                            { columnList.map(column => 
                                <SelectItem value={column.position} key={column.id} >
                                    { column.name }
                                </SelectItem>
                            ) }
                        </SelectContent>
                    </Select>
                </div>

                <div className='grid mr-2 w-full items-center gap-1.5'>
                    <Label htmlFor='reminder-text'>Escribe la descripción</Label>
                    <Input
                        type='text'
                        id='reminder-text'
                        value={reminderText}
                        onChange={handleChange}
                        placeholder='No olvides...'
                    />
                </div>

                <Button onClick={handleClick} variant='ghost'>
                    Crear
                </Button>
            </div>
        </>
    )
}

export default Reminder