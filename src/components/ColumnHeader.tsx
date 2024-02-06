import { useState } from "react"
import './ColumnHeader.css'
import { PencilSquareIcon, TrashIcon } from "./atomic/Icon"
import { useDispatch } from "react-redux"
import { changeColumnName, deleteColumn } from "../redux/columnsSlice"
import toast from "react-hot-toast"
import { getDeleteColumnOption } from "../columnOptions"

interface ColumnHeaderProps{
    name: string
    columnId: string
}

function ColumnHeader({ name, columnId }: ColumnHeaderProps) {
    const [ columnName, setColumnName ] = useState(name)
    const [ isTheColumnNameChanging, setIsTheColumnNameChanging ] = useState(false)

    const deleteOption = getDeleteColumnOption(columnId)

    const dispatch = useDispatch();

    const changeTheColumnName = (columnId: string, newColumnName: string) => {
      dispatch(changeColumnName({ columnId, newColumnName }))
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
                onClick={() => editColumnName()}
                title="Editar el nombre de la columna"
            >
                <PencilSquareIcon />
            </button>
            <button
                className='column-header__change-name-btn'
                onClick={deleteOption.function}
                title="Eliminar columna"
            >
                <TrashIcon />
            </button>
        </div>
    )
}

export default ColumnHeader