import { useState } from "react"
import './ColumnName.css'
import Icon from "./Icon"

interface ColumnNameProps{
    name: string
    columnId: string
    changeColumnName: Function,
    deleteColumn: Function
}

function ColumnName({ name, columnId, changeColumnName, deleteColumn }: ColumnNameProps) {
    const [ columnName, setColumnName ] = useState(name)
    const [ isTheColumnNameChanging, setIsTheColumnNameChanging ] = useState(false)

    enum columnActions {
        EDIT = 'EDIT',
        DELETE = 'DELETE'
    }

    const handleClick = (columnAction: string) => {
        if(columnAction == columnActions.EDIT) {
            if(isTheColumnNameChanging && !!columnName.trim()) {
                changeColumnName(columnId, columnName)
            }
            if(!columnName.trim()) {
                setColumnName(name)
            }
            setIsTheColumnNameChanging(!isTheColumnNameChanging)
        }
        if(columnAction == columnActions.DELETE) {
            deleteColumn(columnId)
        }
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
                onClick={() => handleClick(columnActions.EDIT)}
                title="Editar el nombre de la columna"
            >
                <Icon name="pencil-square" />
            </button>
            <button
                className='column-title__change-name-btn'
                onClick={() => handleClick(columnActions.DELETE)}
                title="Eliminar columna"
            >
                <Icon name="trash-fill" />
            </button>
        </div>
    )
}

export default ColumnName