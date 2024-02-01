import { useDispatch } from 'react-redux'
import { MouseEventHandler } from 'react'
import './TaskOptions.css'
import { CaretLeftIcon, CaretRightIcon, CircleFillIcon, ClipboardIcon, TrashIcon } from './atomic/Icon'
import toast from 'react-hot-toast'
import { Btn } from './atomic/Btn'
import { COLORS_CLASS_NAME } from './atomic/colors'
import { moveToType } from '../domainFunctions/moveTask'
import { deleteTask, highlightTask, moveTask } from '../redux/columnsSlice'
import { taskModel } from '../models/task'

interface option {
    name: string,
    function: MouseEventHandler<HTMLButtonElement>,
    color: COLORS_CLASS_NAME
    icon?: Function
}

function getTaskOptions(task: taskModel): option[] {
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
          icon: () => <ClipboardIcon />
        },
        {
            name: 'Resaltar', 
            function: highlightTheTask,
            color: COLORS_CLASS_NAME.PRIMARY,
            icon: () => <CircleFillIcon />
          },
        {
          name: 'Eliminar', 
          function: deleteTheTask,
          color: COLORS_CLASS_NAME.DANGER,
          icon: () => <TrashIcon />
        },
    ]

    return options
}

interface TaskOptionsProps {
    task: taskModel
}

function TaskOptions({ task }: TaskOptionsProps) {
    const dispatch = useDispatch();

    const moveTheTask = (to: moveToType) => {
        const taskId = task.id
        dispatch(moveTask({ to, taskId }))
    }

    const options = getTaskOptions(task)

    return (
        <>
            <li className='first-option'>
                <Btn onClickHandler={() => moveTheTask('prev-column')} color={COLORS_CLASS_NAME.PRIMARY}>
                    <CaretLeftIcon />
                    <span>Retroceder</span>
                </Btn>
                <Btn onClickHandler={() => moveTheTask('next-column')} color={COLORS_CLASS_NAME.PRIMARY}>
                    <span>Avanzar</span>
                    <CaretRightIcon />
                </Btn>
            </li>
            {
                options.map(option => 
                    <li key={option.name} className='option'>
                        <Btn onClickHandler={option.function} color={option.color} border={false} widthAuto={false}>
                            { option.icon! && option.icon() }
                            <span>{option.name}</span>
                        </Btn>
                    </li>
                )
            }
        </>
    )
}

export default TaskOptions