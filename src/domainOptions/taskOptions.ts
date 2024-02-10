import { MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { addTask, deleteTask, highlightTask, moveTask } from '../redux/columnsSlice'
import { moveToType } from '../domainFunctions/moveTask'
import { COLORS_CLASS_NAME } from '../components/atomic/colors'
import { taskModel } from '../models/task'

interface option {
    name: string,
    color: COLORS_CLASS_NAME
    icon?: Function
}
interface optionEventHandler extends option {
    function: MouseEventHandler<HTMLButtonElement>,
}

export function getTaskOptions(task: taskModel): optionEventHandler[] {
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

interface addTaskOption extends option {
    function(task: taskModel): void
}

export function getAddTaskOption(): addTaskOption {
    const dispatch = useDispatch()
    const addTaskOption: addTaskOption = {
        name: 'Agregar tarea',
        color: COLORS_CLASS_NAME.PRIMARY,
        function: (task: taskModel) => {
            if(!!task.descriptionText.trim()) {
                dispatch(addTask(task))
                toast.success('Tarea creada')
            }
            else {
                toast.error('No pude crear una tarea sin texto (•_•)')
            }
        }
    }
    return addTaskOption
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