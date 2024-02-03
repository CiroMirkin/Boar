import { MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { deleteTask, highlightTask } from './redux/columnsSlice'
import { COLORS_CLASS_NAME } from './components/atomic/colors'
import { taskModel } from './models/task'

interface option {
    name: string,
    function: MouseEventHandler<HTMLButtonElement>,
    color: COLORS_CLASS_NAME
    icon?: Function
}

export function getTaskOptions(task: taskModel): option[] {
    const dispatch = useDispatch();

    const deleteTheTask = () => {
        dispatch(deleteTask(task))
        toast.success('Tarea eliminada')
    }

    const highlightTheTask = () => {
        dispatch(highlightTask(task))
        if(!task.highlight) {
        toast.success('Tarea resaltada')
        }
        else {
        toast.success('Tarea sin resaltado')
        }
    }

    const options = [
        {
          name: 'Copiar', 
          function: () => navigator.clipboard.writeText(task.descriptionText).then(() => toast.success('Tarea copiada al portapapeles')),
          color: COLORS_CLASS_NAME.PRIMARY,
        },
        {
            name: 'Resaltar', 
            function: highlightTheTask,
            color: COLORS_CLASS_NAME.PRIMARY,
          },
        {
          name: 'Eliminar', 
          function: deleteTheTask,
          color: COLORS_CLASS_NAME.DANGER,
        },
    ]

    return options
}