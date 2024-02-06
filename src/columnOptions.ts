import { MouseEventHandler } from "react"
import { COLORS_CLASS_NAME } from "./components/atomic/colors"
import { useDispatch } from "react-redux"
import { addColumn } from "./redux/columnsSlice"

interface option {
    name: string,
    function: MouseEventHandler<HTMLButtonElement>,
    color: COLORS_CLASS_NAME
    icon?: Function
}


export function getCreateDefaultColumnOption(): option {
    const dispatch = useDispatch()
    const createDefaultColumn: option = {
        name: 'Agregar columna',
        function: () => {
            dispatch(addColumn('Nueva columna'))
        },
        color: COLORS_CLASS_NAME.PRIMARY
    }
    return  createDefaultColumn
}