import { useState } from 'react'
import './Column.css'
import ColumnHeader from './ColumnHeader'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../redux/columnsSlice'
import toast from 'react-hot-toast'
import { taskModel } from '../models/task'
import { RootState } from '../redux/store'

interface ColumnProps {
  id: string,
  name: string,
  firstColumn: boolean,
  children: React.ReactNode,
  changeColumnName: Function,
  deleteColumn: Function
};

function Column({ name, id, firstColumn, children, changeColumnName, deleteColumn }: ColumnProps) {
  const [ taskText, setNewTask ] = useState('')
  const dispatch = useDispatch()
  const columns = useSelector((state: RootState) => state.columns.columns)

  const getTask = ({ descriptionText, columnId }: { descriptionText: string, columnId: string }): taskModel => {
    const getColumnIndex = () => {
      let theColumnIndex = 0;
      columns.filter((column, index) => {
        if(column.id == columnId) theColumnIndex = index
      })
      return theColumnIndex
    }
    const columnIndex = getColumnIndex()
    const newTask = {
      descriptionText,
      id: crypto.randomUUID(),
      column: { 
        columnIndex, 
        columnId 
      }
    }
    return newTask
  }

  const pushNewTaskInColumn = () => {
    if(!!taskText.trim()) {
      const newTask = getTask({ descriptionText: taskText, columnId: id })
      dispatch(addTask(newTask))
      toast.success('Tarea creada')
      setNewTask('')
    }
  }

  const handleClick = () => pushNewTaskInColumn()

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == 'Enter') {
      const target = e.target as HTMLInputElement;
      const newTaskText = (target.value).trim()
      setNewTask(newTaskText)
      pushNewTaskInColumn()
    }
  }
  const columnClassName = `column ${firstColumn && 'column--first-column'}`

  return (
    <li className={columnClassName} key={id}>
        <ColumnHeader name={name} columnId={id} changeColumnName={changeColumnName} deleteColumn={deleteColumn} />
        {
          children
        }
        {
          firstColumn &&
            <footer className="column__footer">
              <input 
                type="text" 
                value={taskText} 
                onChange={(e) => setNewTask(e.target.value)} 
                onKeyUp={handleKeyUp}
                placeholder='Agregar una nueva tarea...'
              />
              <button onClick={handleClick}>Agregar</button>
          </footer>
        }
    </li>
  )
}

export default Column