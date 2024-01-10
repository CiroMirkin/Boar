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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { addColumn, addTask, deleteTask } from '../redux/columnsSlice'

interface BoardProps {
  name: string,
  changeName: Function
}

function Board({ name, changeName }: BoardProps) {
  const columns = useSelector((state: RootState) => state.columns.columns)
  const dispatch = useDispatch();

  const addNewTaskInColumn = (newTask: taskModel, columnId: string) => {
    const getColumnIndex = () => {
      let theColumnIndex = 0;
      columns.filter((column, index) => {
        if(column.id == columnId) theColumnIndex = index
      })
      return theColumnIndex
    }
    const columnIndex = getColumnIndex()
    newTask.column = { columnIndex, columnId }

    dispatch(addTask(newTask))
    toast.success('Tarea creada')
  }

  const deleteThisTaskInThisColumn = (taskId: string, columnId: string) => {
    const getTask = () => {
      let task: any;
      columns.map((column) => {
        column.taskList.map(taskInColumn => {
          if(taskInColumn.id === taskId) task = taskInColumn
        })
      })
      return task
    }
    const task = getTask()
    dispatch(deleteTask(task))
    toast.success('Tarea eliminada')
  }

  const moveATask = (to: moveToType, taskId: string) => {
    
  }

  const changeColumnNameOfThisColumn = (columnId: string, newColumnName: string) => {
    
  }

  const addNewColumnAtTheEndOfTheBoard = () => {
    const getColumnId = () => (Number(columns.at(-1)?.id ? columns.at(-1)?.id : '0') + 1).toString()
    dispatch(addColumn({
      name: 'Nueva columna',
      id: getColumnId(),
      taskList: []
    }))
    toast.success('Columna creada')
  }

  const deleteColumn = (columnId: string) => {
    try {
      
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
