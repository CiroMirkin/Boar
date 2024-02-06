import { MouseEventHandler } from "react"
import { COLORS_CLASS_NAME } from "./components/atomic/colors"
import { useDispatch } from "react-redux"
import { addColumn, deleteColumn } from "./redux/columnsSlice"
import toast from "react-hot-toast"

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

export function getDeleteColumnOption(columnId: string): option {
    const dispatch = useDispatch()
    const deleteColumnOption: option = {
        name: 'Eliminar',
        function: () => {
            try {
                dispatch(deleteColumn(columnId))
                toast.success('Columna eliminada')
            }
            catch(e) {
                toast.error('Solo hay tres columnas, no se puede eliminar esta columna')
            }
        },
        color: COLORS_CLASS_NAME.DANGER
    }
    return deleteColumnOption
}