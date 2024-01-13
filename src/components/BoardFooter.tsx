import { useDispatch } from "react-redux"
import { addColumn } from "../redux/columnsSlice"
import toast from "react-hot-toast"
import { Btn } from "./atomic/Btn"
import { COLORS_CLASS_NAME } from "./atomic/colors"

export function BoardFooter() {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(addColumn('Nueva columna'))
        toast.success('Columna creada')
    }

    return (
        <footer className='board-footer'>
            <Btn color={COLORS_CLASS_NAME.PRIMARY} neoBtn onClickHandler={handleClick}>Agregar columna</Btn>
        </footer>
    )
}