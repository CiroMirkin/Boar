import './TaskOptions.css'
import { ClipboardIcon, TrashIcon } from './Icon'
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
            name: "Retroceder",
            function: () => moveTask('prev-column', taskId),
            colorClassName: BTN_COLORS.SUCCESS
        },
        {
            name: "Avanzar",
            function: () => moveTask('next-column', taskId),
            colorClassName: BTN_COLORS.SUCCESS
        },
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
            {
                options.map(option => 
                    <li key={option.name}>
                        <Btn onClickHandler={() => option.function()} color={option.colorClassName}>
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