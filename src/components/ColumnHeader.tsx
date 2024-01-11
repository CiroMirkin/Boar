import { useState } from "react"
import './ColumnHeader.css'
import { PencilSquareIcon, TrashIcon } from "./Icon"
import { useDispatch } from "react-redux"
import { changeColumnName, deleteColumn } from "../redux/columnsSlice"
import toast from "react-hot-toast"

interface ColumnHeaderProps{
    name: string
    columnId: string
}

function ColumnHeader({ name, columnId }: ColumnHeaderProps) {
    const [ columnName, setColumnName ] = useState(name)
    const [ isTheColumnNameChanging, setIsTheColumnNameChanging ] = useState(false)
    const dispatch = useDispatch();

    const changeTheColumnName = (columnId: string, newColumnName: string) => {
      dispatch(changeColumnName({ columnId, newColumnName }))
    }
  
    const deleteTheColumn = (columnId: string) => {
      try {
        dispatch(deleteColumn(columnId))
        toast.success('Columna eliminada')
      }
      catch(e) {
        toast.error('Solo hay tres columnas, no se puede eliminar esta columna')
      }
    }

    const editColumnName = () => {
        if(isTheColumnNameChanging && !!columnName.trim()) {
            changeTheColumnName(columnId, columnName)
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
            deleteTheColumn(columnId)
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