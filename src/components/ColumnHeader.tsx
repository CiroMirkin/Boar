import { useState } from "react"
import './ColumnHeader.css'
import { PencilSquareIcon, TrashIcon } from "./Icon"

interface ColumnHeaderProps{
    name: string
    columnId: string
    changeColumnName: Function,
    deleteColumn: Function
}

function ColumnHeader({ name, columnId, changeColumnName, deleteColumn }: ColumnHeaderProps) {
    const [ columnName, setColumnName ] = useState(name)
    const [ isTheColumnNameChanging, setIsTheColumnNameChanging ] = useState(false)

    const editColumnName = () => {
        if(isTheColumnNameChanging && !!columnName.trim()) {
            changeColumnName(columnId, columnName)
        }
        if(!columnName.trim()) {
            setColumnName(name)
        }
        setIsTheColumnNameChanging(!isTheColumnNameChanging)
    }
    
    enum columnActions {
        EDIT = 'EDIT',
        DELETE = 'DELETE'
    }

    const handleClick = (columnAction: string) => {
        if(columnAction == columnActions.EDIT) {
            editColumnName()
        }
        if(columnAction == columnActions.DELETE) {
            deleteColumn(columnId)
        }
    }

    return (
        <div className='column-header'>
            { 
                isTheColumnNameChanging 
                ? <input 
                        type="text" 
                        value={columnName} 
                        onChange={(e) => setColumnName(e.target.value)} 
                        onKeyUp={(e) => e.key == 'Enter' && editColumnName()}
                    /> 
                : <h2>{name}</h2> 
            }
            <button 
                className='column-header__change-name-btn' 
                onClick={() => handleClick(columnActions.EDIT)}
                title="Editar el nombre de la columna"
            >
                <PencilSquareIcon />
            </button>
            <button
                className='column-header__change-name-btn'
                onClick={() => handleClick(columnActions.DELETE)}
                title="Eliminar columna"
            >
                <TrashIcon />
            </button>
        </div>
    )
}

export default ColumnHeader