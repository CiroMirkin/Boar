import { useState } from "react"
import './ColumnName.css'

interface ColumnNameProps{
    name: string
}

function ColumnName({ name }: ColumnNameProps) {
    const [ columnName, setColumnName ] = useState(name)
    const [ isTheColumnNameChanging, setIsTheColumnNameChanging ] = useState(false)

    return (
        <div className='column-title'>
            { 
                isTheColumnNameChanging 
                ? <input type="text" value={columnName} onChange={(e) => setColumnName(e.target.value)}/> 
                : <h2>{columnName}</h2> 
            }
            <button 
                className='column-title__change-name-btn' 
                onClick={() => setIsTheColumnNameChanging(!isTheColumnNameChanging)}
                style={{color: isTheColumnNameChanging ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.192)"}}
            >Cambiar nombre</button>
        </div>
    )
}

export default ColumnName