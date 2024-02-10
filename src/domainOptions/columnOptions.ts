import { MouseEventHandler } from "react"
import { COLORS_CLASS_NAME } from "../components/atomic/colors"
import { useDispatch } from "react-redux"
import { addColumn, changeColumnName, deleteColumn } from "../redux/columnsSlice"
import toast from "react-hot-toast"
import { columnModel } from "../models/column"

interface option {
    name: string,
    color: COLORS_CLASS_NAME
    icon?: Function
}

interface optionEventHandler extends option {
    function: MouseEventHandler<HTMLButtonElement>,
}

interface optionEditFunction extends option {
    function(column: columnModel, data: string): void
}

export function getCreateDefaultColumnOption(): optionEventHandler {
    const dispatch = useDispatch()
    const createDefaultColumn: optionEventHandler = {
        name: 'Agregar columna',
        function: () => {
            dispatch(addColumn('Nueva columna'))
        },
        color: COLORS_CLASS_NAME.PRIMARY
    }
    return  createDefaultColumn
}

export function getDeleteColumnOption(columnId: string): optionEventHandler {
    const dispatch = useDispatch()
    const deleteColumnOption: optionEventHandler = {
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

export function getEditColumnOption(): optionEditFunction {
    const dispatch = useDispatch()
    const editColumnOption: optionEditFunction = {
        name: "Cambiar nombre",
        function: (column: columnModel, data: string) => {
            dispatch(changeColumnName({ 
                columnId: column.id, 
                newColumnName: data
            }))
        },
        color: COLORS_CLASS_NAME.PRIMARY
    }
    return editColumnOption
}

