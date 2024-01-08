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
import BoardHeader from './BoardHeader'
import { addColumnAtTheEnd } from '../domainFunctions/addColumn'
import { deleteThisColumnFromColumns } from '../domainFunctions/deleteColumn'
import { editThisTask } from '../domainFunctions/editTask'

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

  const editTask = (taskId: string, newTaskText: string) => {
    const newColumns = editThisTask({ taskId, columns, newTaskText })
    setColumns(newColumns)
    toast.success('Tarea editada')
  }

  const changeColumnNameOfThisColumn = (columnId: string, newColumnName: string) => {
    const newColumns = changeColumnName({ columnId, newColumnName, columns })
    setColumns(newColumns)
  }

  const addNewColumnAtTheEndOfTheBoard = () => {
    const newColumns = addColumnAtTheEnd('Nueva columna', columns)
    setColumns(newColumns)
    toast.success('Columna creada')
  }

  const deleteColumn = (columnId: string) => {
    try {
      const newColumns = deleteThisColumnFromColumns({ columnId, columns })
      setColumns(newColumns)
      toast.success('Columna eliminada')
    }
    catch(e) {
      toast.error('Solo hay tres columnas, no se puede eliminar esta columna')
    }
  }

  return (
    <>
      <BoardHeader name={name} changeName={changeName} />

      <ul className='board'>
          {
              columns.map((column, index) => 
                  <Column 
                    key={column.id} 
                    id={column.id} 
                    name={column.name} 
                    firstColumn={index == 0}
                    addNewTaskInColumn={addNewTaskInColumn}
                    changeColumnName={changeColumnNameOfThisColumn}
                    deleteColumn={deleteColumn}
                  > 
                    <TaskList 
                      taskList={column.taskList} 
                      deleteTask={(taskId: string) => deleteThisTaskInThisColumn(taskId, column.id)}
                      editTask={index === 0 ? editTask : undefined}
                      moveTask={moveATask}
                    />
                  </Column>
              )
          }
      </ul>

      <footer className='board-footer'>
        <button className='btn' onClick={() => addNewColumnAtTheEndOfTheBoard()}>Agregar columna</button>
      </footer>
    </>
  )
}

export default Board
