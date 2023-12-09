import { columnModel } from '../models/column'
import './Board.css'
import Column from './Column'
import TaskList from './TaskList'
import { taskModel } from '../models/task'
import { addTaskToThisColumn } from '../addTask'

interface BoardProps {
    columns: columnModel[],
    setColumns: Function
}

function Board({ columns, setColumns }: BoardProps) {

  const addNewTaskInColumn = (newTask: taskModel, columnId: string) => {
    const newColumns = addTaskToThisColumn(columnId, columns, newTask)
    setColumns(newColumns)
  }

  return (
    <ul className='board'>
        {
            columns.map(column => 
                <Column 
                  key={column.id} 
                  id={column.id} 
                  name={column.name} 
                  addNewTaskInColumn={addNewTaskInColumn}
                > 
                  <TaskList taskList={column.taskList}/>
                </Column>
            )
        }
    </ul>
  )
}

export default Board
