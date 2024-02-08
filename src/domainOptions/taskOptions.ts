import { MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { deleteTask, highlightTask, moveTask } from '../redux/columnsSlice'
import { moveToType } from '../domainFunctions/moveTask'
import { COLORS_CLASS_NAME } from '../components/atomic/colors'
import { taskModel } from '../models/task'

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

export function getMoveTaskOptions(task: taskModel): option[] {
    const dispatch = useDispatch();
    
    const moveTheTask = (to: moveToType) => {
        const taskId = task.id
        dispatch(moveTask({ to, taskId }))
    }

    const moveOptions = [
        {
            name: "Retroceder",
            function: () => moveTheTask('prev-column'),
            color: COLORS_CLASS_NAME.PRIMARY
        },
        {
            name: "Avanzar",
            function: () => moveTheTask('next-column'),
            color: COLORS_CLASS_NAME.PRIMARY
        },
    ]

    return moveOptions
}