import { useDispatch, useSelector } from "react-redux"
import { addColumn } from "../redux/columnsSlice"
import { RootState } from "../redux/store"
import toast from "react-hot-toast"


export function BoardFooter({ }) {
    const handleClick = () => {
        const columns = useSelector((state: RootState) => state.columns.columns)
        const getColumnId = () => (Number(columns.at(-1)?.id ? columns.at(-1)?.id : '0') + 1).toString()
        const dispatch = useDispatch()
        dispatch(addColumn({
          name: 'Nueva columna',
          id: getColumnId(),
          taskList: []
        }))
        toast.success('Columna creada')
    }

    return (
        <footer className='board-footer'>
            <button className='btn' onClick={handleClick}>Agregar columna</button>
        </footer>
    )
}