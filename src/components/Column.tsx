import { useState } from 'react'
import './Column.css'
import ColumnHeader from './ColumnHeader'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../redux/columnsSlice'
import toast from 'react-hot-toast'
import { taskModel } from '../models/task'
import { RootState } from '../redux/store'
import { Container } from './atomic/Container'

interface ColumnProps {
  id: string,
  name: string,
  firstColumn: boolean,
  children: React.ReactNode
};

function Column({ name, id, firstColumn, children }: ColumnProps) {
  const [ taskText, setTaskText ] = useState('')
  const dispatch = useDispatch()
  const columns = useSelector((state: RootState) => state.columns.columns)

  const getNewTask = ({ descriptionText, columnId }: { descriptionText: string, columnId: string }): taskModel => {
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
      const newTask = getNewTask({ descriptionText: taskText, columnId: id })
      dispatch(addTask(newTask))
      setTaskText('')
      toast.success('Tarea creada')
    }
    else {
      toast.error('No pude crear una tarea sin texto (•_•)')
    }
  }

  const handleClick = () => pushNewTaskInColumn()
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => e.key == 'Enter' && pushNewTaskInColumn()
  
  const columnClassName = `column ${firstColumn && 'column--first-column'}`

  return (
    <Container customClassName={columnClassName}>
      <Container>
        <ColumnHeader name={name} columnId={id} /> 
        { children } 
      </Container>
      {
        firstColumn &&
          <footer className="column__footer">
            <input 
              type="text" 
              value={taskText} 
              onChange={(e) => setTaskText(e.target.value)} 
              onKeyUp={handleKeyUp}
              placeholder='Agregar una nueva tarea...'
            />
            <button onClick={handleClick}>Agregar</button>
        </footer>
      }
    </Container>

  )
}

export default Column