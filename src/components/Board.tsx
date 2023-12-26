import { columnModel } from '../models/column'
import './Board.css'
import Column from './Column'
import TaskList from './TaskList'
import { taskModel } from '../models/task'
import { addTaskToThisColumn } from '../domainFunctions/addTask'
import { deleteThisTaskFromThisColumn } from '../domainFunctions/deleteTask'
import { moveTask, moveToType } from '../domainFunctions/moveTask'
import { changeColumnName } from '../domainFunctions/changeColumnName'
import toast from 'react-hot-toast'
import BoardName from './BoardName'

interface BoardProps {
  columns: columnModel[],
  setColumns: Function,
  name: string,
  changeName: Function
}

function Board({ columns, setColumns, name, changeName }: BoardProps) {

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
    <>
      <BoardName name={name} changeName={changeName} />
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
    </>
  )
}

export default Board
