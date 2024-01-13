import './TaskOptions.css'
import { CaretLeftIcon, CaretRightIcon, ClipboardIcon, TrashIcon } from './atomic/Icon'
import toast from 'react-hot-toast'
import { Btn } from './atomic/Btn'
import { COLORS_CLASS_NAME } from './atomic/colors'

interface TaskOptionsProps {
    taskId: string,
    taskDescription: string
    deleteTask: Function,
    moveTask: Function
}

function TaskOptions({ taskId, deleteTask, moveTask, taskDescription }: TaskOptionsProps) {
    interface option {
        name: string,
        function: Function,
        color: COLORS_CLASS_NAME
        icon?: Function
    }
    
    const options: option[] = [
        {
          name: 'Copiar', 
          function: () => navigator.clipboard.writeText(taskDescription).then(() => toast.success('Tarea copiada al portapapeles')),
          color: COLORS_CLASS_NAME.PRIMARY,
          icon: () => <ClipboardIcon />
        },
        {
          name: 'Eliminar', 
          function: () => deleteTask(taskId),
          color: COLORS_CLASS_NAME.DANGER,
          icon: () => <TrashIcon />
        },
    ]

    return (
        <>
            <li className='first-option'>
                <Btn onClickHandler={() => moveTask('prev-column', taskId)} color={COLORS_CLASS_NAME.PRIMARY}>
                    <CaretLeftIcon />
                    <span>Retroceder</span>
                </Btn>
                <Btn onClickHandler={() => moveTask('next-column', taskId)} color={COLORS_CLASS_NAME.PRIMARY}>
                    <span>Avanzar</span>
                    <CaretRightIcon />
                </Btn>
            </li>
            {
                options.map(option => 
                    <li key={option.name} className='option'>
                        <Btn onClickHandler={() => option.function()} color={option.color} border={false} widthAuto={true}>
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