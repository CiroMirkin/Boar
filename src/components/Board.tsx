import './Board.css'
import Column from './Column'
import TaskList from './TaskList'
import { moveToType } from '../domainFunctions/moveTask'
import toast from 'react-hot-toast'
import BoardHeader from './BoardHeader'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { changeColumnName, deleteColumn, deleteTask, moveTask } from '../redux/columnsSlice'
import { BoardFooter } from './BoardFooter'

interface BoardProps {
  name: string,
  changeName: Function
}

function Board({ name, changeName }: BoardProps) {
  const columns = useSelector((state: RootState) => state.columns.columns)
  const dispatch = useDispatch();

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
                    changeColumnName={changeColumnNameOfThisColumn}
                    deleteColumn={deleteThisColumn}
                  > 
                    <TaskList taskList={column.taskList} />
                  </Column>
              )
          }
      </ul>

      <BoardFooter />
    </>
  )
}

export default Board
