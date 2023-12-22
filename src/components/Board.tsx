import { columnModel } from '../models/column'
import './Board.css'
import Column from './Column'
import TaskList from './TaskList'
import { taskModel } from '../models/task'
import { addTaskToThisColumn } from '../addTask'
import { deleteThisTaskFromThisColumn } from '../deleteTask'
import { moveTask, moveToType } from '../moveTask'
import { changeColumnName } from '../changeColumnName'
import toast from 'react-hot-toast'

interface BoardProps {
    columns: columnModel[],
    setColumns: Function
}

function Board({ columns, setColumns }: BoardProps) {

  const addNewTaskInColumn = (newTask: taskModel, columnId: string) => {
    const newColumns = addTaskToThisColumn(columnId, columns, newTask)
    setColumns(newColumns)
    toast.success('Tarea creada')
  }

  const deleteThisTaskInThisColumn = (taskId: string, columnId: string) => {
    const newColumns = deleteThisTaskFromThisColumn(taskId, columnId, columns)
    setColumns(newColumns)
    toast.success('Tarea eliminada')
  }

  const moveATask = (to: moveToType, taskId: string) => {
    const newColumns = moveTask({to, columns, taskId})
    setColumns(newColumns)
  }

  const changeColumnNameOfThisColumn = (columnId: string, newColumnName: string) => {
    const newColumns = changeColumnName({ columnId, newColumnName, columns })
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
                  changeColumnName={changeColumnNameOfThisColumn}
                > 
                  <TaskList 
                    taskList={column.taskList} 
                    deleteTask={(taskId: string) => deleteThisTaskInThisColumn(taskId, column.id)}
                    moveTask={moveATask}
                  />
                </Column>
            )
        }
    </ul>
  )
}

export default Board
