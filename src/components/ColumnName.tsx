import { useState } from "react"
import './ColumnName.css'
import Icon from "./Icon"

interface ColumnNameProps{
    name: string
    columnId: string
    changeColumnName: Function
}

function ColumnName({ name, changeColumnName, columnId }: ColumnNameProps) {
    const [ columnName, setColumnName ] = useState(name)
    const [ isTheColumnNameChanging, setIsTheColumnNameChanging ] = useState(false)

    const handleClick = () => {
        if(isTheColumnNameChanging && !!columnName.trim()) {
            changeColumnName(columnId, columnName)
        }
        if(!columnName.trim()) {
            setColumnName(name)
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
                title="Editar el nombre de la columna"
            >
                    <Icon name="pencil-square" />
            </button>
        </div>
    )
}

export default ColumnName