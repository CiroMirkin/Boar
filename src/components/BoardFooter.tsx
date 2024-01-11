import { useDispatch } from "react-redux"
import { addColumn } from "../redux/columnsSlice"
import toast from "react-hot-toast"
import { BTN_COLORS, Btn } from "./Btn"

export function BoardFooter() {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(addColumn('Nueva columna'))
        toast.success('Columna creada')
    }

    return (
        <footer className='board-footer'>
            <Btn color={BTN_COLORS.PRIMARY} neoBtn onClickHandler={handleClick}>Agregar columna</Btn>
        </footer>
    )
}