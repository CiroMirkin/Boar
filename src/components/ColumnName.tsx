import { useState } from "react"

interface ColumnNameProps{
    name: string
}

function ColumnName({ name }: ColumnNameProps) {
    const [ columnName, setColumnName ] = useState(name)
    const [ isTheColumnNameChanging, setIsTheColumnNameChanging ] = useState(false)

    return (
        <h2 className='column__title'>
          { 
            isTheColumnNameChanging 
            ? <input type="text" value={columnName} onChange={(e) => setColumnName(e.target.value)}/> 
            : columnName 
          }
          <button className='column__title-change-name-btn' onClick={() => setIsTheColumnNameChanging(!isTheColumnNameChanging)}>Cambiar nombre</button>
        </h2>
    )
}

export default ColumnName