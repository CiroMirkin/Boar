import './TaskOptions.css'
import { CaretLeftIcon, CaretRightIcon, ClipboardIcon, TrashIcon } from './Icon'
import toast from 'react-hot-toast'
import { BTN_COLORS, Btn } from './Btn'

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
        colorClassName: BTN_COLORS
        icon?: Function
    }
    
    const options: option[] = [
        {
          name: 'Copiar', 
          function: () => navigator.clipboard.writeText(taskDescription).then(() => toast.success('Tarea copiada al portapapeles')),
          colorClassName: BTN_COLORS.PRIMARY,
          icon: () => <ClipboardIcon />
        },
        {
          name: 'Eliminar', 
          function: () => deleteTask(taskId),
          colorClassName: BTN_COLORS.DANGER,
          icon: () => <TrashIcon />
        },
    ]

    return (
        <>
            <li className='first-option'>
                <Btn onClickHandler={() => moveTask('prev-column', taskId)} color={BTN_COLORS.SUCCESS}>
                    <CaretLeftIcon />
                    <span>Retroceder</span>
                </Btn>
                <Btn onClickHandler={() => moveTask('next-column', taskId)} color={BTN_COLORS.SUCCESS}>
                    <span>Avanzar</span>
                    <CaretRightIcon />
                </Btn>
            </li>
            {
                options.map(option => 
                    <li key={option.name} className='option'>
                        <Btn onClickHandler={() => option.function()} color={option.colorClassName} border={false}>
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