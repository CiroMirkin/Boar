import { useState } from "react"
import './BoardHeader.css'
import Icon from "./Icon"

interface BoardHeaderProps {
    name: string,
    changeName: Function
}
  
function BoardHeader({ name, changeName }: BoardHeaderProps) {
    const [ boardName, setBoardName ] = useState(name)
    const [ isTheColumnNameChanging, setIsTheColumnNameChanging ] = useState(false)

    const handleClick = () => {
        if(isTheColumnNameChanging && !!boardName.trim()) {
            changeName(boardName)
        }
        if(!boardName.trim()) {
            setBoardName(name)
        }
        setIsTheColumnNameChanging(!isTheColumnNameChanging)
    }

    return (
        <div className="board-header-component">
            { 
                isTheColumnNameChanging 
                ? <input type="text" value={boardName} onChange={(e) => setBoardName(e.target.value)}/> 
                : <h1 className='board-name'>{name}</h1> 
            }
            <button 
                className='board-name__change-name-btn' 
                onClick={handleClick}
                title="Editar el nombre del tablero"
            >
                <Icon name="pencil-square" />
            </button>
        </div>
    )
  }
  
  export default BoardHeader
  
