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
import { ColumnList } from "@/models/columnList"
import { useToast } from "@/ui/use-toast"

export interface Reminder {
    columnPosition: string
    text: string
}

interface ReminderProps {
    columnList: ColumnList
}

function Reminder({ columnList }: ReminderProps) {
    const [reminderText, setReminderText] = useState("")
    const [reminderColumnPosition, setReminderColumnPosition] = useState("")

    const { toast } = useToast()

    const handleClick = () => {
        const reminder: Reminder = {
            text: reminderText,
            columnPosition: reminderColumnPosition
        }

        if(!!reminder.text && !!reminder.columnPosition) {
            console.table(reminder)
        }
        else {
            toast({
				description: "Los datos del recordatorio no están completos.",
                variant: "destructive",
				duration: 3000,
			})
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newReminderText = e.target.value
        setReminderText(newReminderText)
    }


    return (
        <div className="max-w-2xl mt-2 grid gap-3">
            <div className='grid mr-2 w-full items-center gap-1.5'>
                <Label>Selecciona una columna</Label>
                <Select onValueChange={(value) => setReminderColumnPosition(value)}>
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
                <Label htmlFor='reminder-text'>Escribe el ecordatorio</Label>
                <Input
                    type='text'
                    id='reminder-text'
                    value={reminderText}
                    onChange={handleChange}
                    placeholder='Recordatorio...'
                />
            </div>

            <Button onClick={handleClick} variant='ghost'>
                Crear
            </Button>
        </div>
    )
}

export default Reminder