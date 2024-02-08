import { useState } from 'react'
import './Column.css'
import ColumnHeader from './ColumnHeader'
import { useSelector } from 'react-redux'
import { taskModel } from '../models/task'
import { RootState } from '../redux/store'
import { Container } from './atomic/Container'
import { columnModel } from '../models/column'
import { getAddTaskOption } from '../columnOptions'

interface ColumnProps {
  id: string,
  columnData: columnModel,
  firstColumn: boolean,
  children: React.ReactNode
};

function Column({ id, firstColumn, columnData, children }: ColumnProps) {
  const [ taskText, setTaskText ] = useState('')
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

  const addTaskOption = getAddTaskOption()

  const pushNewTaskInColumn = () => {
    const newTask = getNewTask({ descriptionText: taskText, columnId: id })
    addTaskOption.function(newTask)
    setTaskText('')
  }

  const handleClick = () => pushNewTaskInColumn()
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => e.key == 'Enter' && pushNewTaskInColumn()
  
  const columnClassName = `column ${firstColumn && 'column--first-column'}`

  return (
    <Container customClassName={columnClassName}>
      <Container>
        <ColumnHeader column={columnData}/> 
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