import { useState } from 'react'
import './TaskOptions.css'
import Icon, { iconType } from './Icon'
import toast from 'react-hot-toast'

interface TaskOptionsProps {
    taskId: string,
    taskDescription: string
    deleteTask: Function,
    moveTask: Function,
}

interface options {
    name: string,
    function: Function,
    colorClassName: string
    iconName?: iconType
}

function TaskOptions({ taskId, deleteTask, moveTask, taskDescription }: TaskOptionsProps) {
    const [ showTaskOptions, setShowTaskOptions ] = useState(false)
    const [ doesTheUserEditTheTask, setDoesTheUserEditTheTask ] = useState(false)
    const [ taskText, setTaskText ] = useState(taskDescription)
    const options: options[] = [
        {
            name: "Retroceder",
            function: () => moveTask('prev-column', taskId),
            colorClassName: "task-option-btn--primary"
        },
        {
            name: "Avanzar",
            function: () => moveTask('next-column', taskId),
            colorClassName: "task-option-btn--primary"
        },
        {
          name: 'Copiar', 
          function: () => navigator.clipboard.writeText(taskDescription).then(() => toast.success('Tarea copiada al portapapeles')),
          colorClassName: 'task-option-btn--primary',
          iconName: 'clipboard2-fill'
        },
        {
          name: 'Eliminar', 
          function: () => deleteTask(taskId),
          colorClassName: 'task-option-btn--danger',
          iconName: "trash-fill"
        },
    ]

    const toggleTaskOptions = () => {
        const newShowTaskOptionsValue = !showTaskOptions
        setShowTaskOptions(newShowTaskOptionsValue)
    }

    const handleClick = () => {
        if(doesTheUserEditTheTask) {
            console.log('edit')
        }
        setDoesTheUserEditTheTask(!doesTheUserEditTheTask)
    }
    
    return (
        <footer className='task-options'>
            <button className='task-options__btn' onClick={toggleTaskOptions} title='Opciones'>
                <Icon name='three-dots'></Icon>
            </button>
            <ul className={`task-options__options ${showTaskOptions ? 'task-options__options--show' : 'task-options__options--hide'}`}>
                {
                    options.map(option => 
                        <li key={option.name}>
                            <button onClick={() => option.function()} className={`task-option-btn ${option.colorClassName}`}>
                                { option.iconName! && <Icon name={option.iconName}></Icon> }
                                <span>{option.name}</span>
                            </button>
                        </li>
                    )
                }
                <li>
                    <button 
                        onClick={handleClick} 
                        className='task-option-btn task-option-btn--primary'
                    >
                        <Icon name={'pencil-square'}></Icon>
                        <span>Cambiar texto</span>
                    </button>
                </li>
                {
                    doesTheUserEditTheTask && 
                    <li style={{display: 'flex'}}>
                        <input 
                            type="text" 
                            name="Editar descripción de la tarea" 
                            value={taskText} 
                            onChange={(e) => setTaskText(e.target.value)}
                        />
                        <button onClick={handleClick} className='task-option-btn task-option-btn--primary'>
                            <Icon name={'pencil-square'}></Icon>
                        </button>
                    </li>
                }
            </ul>
        </footer>
    )
}

export default TaskOptions