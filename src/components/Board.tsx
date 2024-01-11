import './Board.css'
import Column from './Column'
import TaskList from './TaskList'
import { taskModel } from '../models/task'
import { moveToType } from '../domainFunctions/moveTask'
import toast from 'react-hot-toast'
import BoardHeader from './BoardHeader'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { addTask, changeColumnName, deleteColumn, deleteTask, moveTask } from '../redux/columnsSlice'
import { BoardFooter } from './BoardFooter'

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
    dispatch(moveTask({ to, taskId }))
  }

  const changeColumnNameOfThisColumn = (columnId: string, newColumnName: string) => {
    dispatch(changeColumnName({ columnId, newColumnName }))
  }

  const deleteThisColumn = (columnId: string) => {
    try {
      dispatch(deleteColumn(columnId))
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
                    deleteColumn={deleteThisColumn}
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

      <BoardFooter />
    </>
  )
}

export default Board
