import { useState } from "react"
import './ColumnName.css'

interface ColumnNameProps{
    name: string
    columnId: string
    changeColumnName: Function
}

function ColumnName({ name, changeColumnName, columnId }: ColumnNameProps) {
    const [ columnName, setColumnName ] = useState(name)
    const [ isTheColumnNameChanging, setIsTheColumnNameChanging ] = useState(false)

    const handleClick = () => {
        if(isTheColumnNameChanging) {
            changeColumnName(columnId, columnName)
        }
        setIsTheColumnNameChanging(!isTheColumnNameChanging)
    }

    return (
        <div className='column-title'>
            { 
                isTheColumnNameChanging 
                ? <input type="text" value={columnName} onChange={(e) => setColumnName(e.target.value)}/> 
                : <h2>{name}</h2> 
            }
            <button 
                className='column-title__change-name-btn' 
                onClick={handleClick}
                style={{color: isTheColumnNameChanging ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.192)"}}
            >Cambiar nombre</button>
        </div>
    )
}

export default ColumnName