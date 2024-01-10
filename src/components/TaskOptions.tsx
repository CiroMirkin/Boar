import { useState } from 'react'
import './TaskOptions.css'
import { ClipboardIcon, PencilSquareIcon, TrashIcon } from './Icon'
import toast from 'react-hot-toast'

interface TaskOptionsProps {
    taskId: string,
    taskDescription: string
    deleteTask: Function,
    moveTask: Function,
    editTask?: Function
}

interface options {
    name: string,
    function: Function,
    colorClassName: string
    icon?: Function
}

function TaskOptions({ taskId, deleteTask, moveTask, editTask, taskDescription }: TaskOptionsProps) {
    const [ doesTheUserEditTheTask, setDoesTheUserEditTheTask ] = useState(false)
    const [ taskText, setTaskText ] = useState(taskDescription)
    const options: options[] = [
        {
            name: "Retroceder",
            function: () => moveTask('prev-column', taskId),
            colorClassName: "task-option-btn--success"
        },
        {
            name: "Avanzar",
            function: () => moveTask('next-column', taskId),
            colorClassName: "task-option-btn--success"
        },
        {
          name: 'Copiar', 
          function: () => navigator.clipboard.writeText(taskDescription).then(() => toast.success('Tarea copiada al portapapeles')),
          colorClassName: 'task-option-btn--primary',
          icon: () => <ClipboardIcon />
        },
        {
          name: 'Eliminar', 
          function: () => deleteTask(taskId),
          colorClassName: 'task-option-btn--danger',
          icon: () => <TrashIcon />
        },
    ]

    const editTaskPositionInOptionsList = 2;
    const SpliceParamToInsertAnElementWithoutDeletingElements = 0
    editTask && options.splice(
        editTaskPositionInOptionsList, SpliceParamToInsertAnElementWithoutDeletingElements, 
        {
            name: 'Editar', 
            function: () => showEditTaskInput(),
            colorClassName: 'task-option-btn--primary',
            icon: () => <PencilSquareIcon />
        }
    )
    const showEditTaskInput = () => {
        setDoesTheUserEditTheTask(!doesTheUserEditTheTask)
    }
    
    const editTaskBtnHandleClick = () => {
        if(doesTheUserEditTheTask && !taskText) {
            toast.error('La tarea esta vacía')
        }
        else if(doesTheUserEditTheTask && editTask) {
            editTask(taskId, taskText)
            setDoesTheUserEditTheTask(!doesTheUserEditTheTask)
        }
        else setDoesTheUserEditTheTask(!doesTheUserEditTheTask)
    }
    
    return (
        <>
            <li className='task-options__options-first-option'>
                    {
                        doesTheUserEditTheTask && 
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '2px' ,padding: '0.2rem' }}>
                            <input 
                                type="text" 
                                name="Editar descripción de la tarea" 
                                value={taskText} 
                                onKeyUp={(e) => e.key == 'Enter' && editTaskBtnHandleClick()}
                                onChange={(e) => setTaskText(e.target.value)}
                            />
                            <button onClick={editTaskBtnHandleClick} className='task-option-btn task-option-btn--primary'>
                                <PencilSquareIcon />
                            </button>
                        </div>
                    }
                </li>
                {
                    options.map(option => 
                        <li key={option.name}>
                            <button onClick={() => option.function()} className={`task-option-btn ${option.colorClassName}`}>
                                { option.icon! && option.icon() }
                                <span>{option.name}</span>
                            </button>
                        </li>
                    )
                }
        </>
    )
}

export default TaskOptions