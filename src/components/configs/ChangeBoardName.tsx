import { Input } from "@/ui/input"
import { ChangeEvent, useState } from "react"
import { Button } from "@/ui/button"
import { useDispatch } from "react-redux"
import { changeTheNameOfTheBoard } from "@/redux/boardReducer"
import { Pencil } from "lucide-react"
import { iconSize } from "@/configs/iconsConstants"
import { Label } from "@/ui/label"

interface ChangeBoardNameProps {
    name: string
}

export function ChangeBoardName({ name }: ChangeBoardNameProps) {
    const [ boardName, setBoardName ] = useState(name)
    const [ inputDisabled, setInputDisabled ] = useState(true)

    const dispatch = useDispatch()

    const changeName = () => dispatch(changeTheNameOfTheBoard(boardName))

    const handleClick = () => {
        if(inputDisabled) {
            setInputDisabled(false)
        } else {
            changeName()
            setInputDisabled(true)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newBoardName = e.target.value
        if(newBoardName.length < 30) {
            setBoardName(newBoardName.trim())
        }
    }
    return (
        <>
            <div className="grid mr-2 w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="board-name">Nombre</Label>
                <Input 
                    type="text"
                    id="board-name"
                    value={boardName} 
                    onChange={handleChange}
                    disabled={inputDisabled} 
                    placeholder="Nombre del tablero"
                />
            </div>
            <Button onClick={handleClick} variant='ghost'>
                <Pencil size={iconSize} className="mr-2" /> Renombrar
            </Button>
        </>
    )
} 