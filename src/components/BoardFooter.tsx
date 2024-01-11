import { useDispatch } from "react-redux"
import { addColumn } from "../redux/columnsSlice"
import toast from "react-hot-toast"

export function BoardFooter() {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(addColumn('Nueva columna'))
        toast.success('Columna creada')
    }

    return (
        <footer className='board-footer'>
            <button className='btn' onClick={handleClick}>Agregar columna</button>
        </footer>
    )
}