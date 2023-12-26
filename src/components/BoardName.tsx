import { useState } from "react"
import './BoardName.css'

interface BoardNameProps {
    name: string,
    changeName: Function
}
  
function BoardName({ name, changeName }: BoardNameProps) {
    const [ boardName, setBoardName ] = useState(name)
    const [ isTheColumnNameChanging, setIsTheColumnNameChanging ] = useState(false)

    const handleClick = () => {
        if(isTheColumnNameChanging) {
            changeName(boardName)
        }
        setIsTheColumnNameChanging(!isTheColumnNameChanging)
    }

    return (
        <div className="board-name-component">
            { 
                isTheColumnNameChanging 
                ? <input type="text" value={boardName} onChange={(e) => setBoardName(e.target.value)}/> 
                : <h1 className='board-name'>{name}</h1> 
            }
            <button 
                className='board-name__change-name-btn' 
                onClick={handleClick}
                style={{opacity: isTheColumnNameChanging ? "1" : "0.192"}}
            >Cambiar nombre</button>
        </div>
    )
  }
  
  export default BoardName
  
