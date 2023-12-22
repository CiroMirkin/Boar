import { useState } from 'react'
import './TaskOptions.css'
import Icon from './Icon'

interface TaskOptionsProps {
    taskId: string,
    deleteTask: Function,
    moveTask: Function,
}

interface options {
    name: string,
    function: Function
}

function TaskOptions({ taskId, deleteTask, moveTask }: TaskOptionsProps) {
    const [ showTaskOptions, setShowTaskOptions ] = useState(false)
    const options: options[] = [
        {
            name: "Retroceder",
            function: () => moveTask('prev-column', taskId)
        },
        {
            name: "Avanzar",
            function: () => moveTask('next-column', taskId)
        },
        {
          name: 'Eliminar', 
          function: () => deleteTask(taskId)
        },
    ]

    const toggleTaskOptions = () => {
        const newShowTaskOptionsValue = !showTaskOptions
        setShowTaskOptions(newShowTaskOptionsValue)
    }
    
    return (
        <footer className='task-options'>
            <button 
                className='task-options__btn' 
                onClick={toggleTaskOptions} 
                style={{opacity:  showTaskOptions ? "1" : ".5"}}
            >
                <Icon name='three-dots'></Icon>
            </button>
            <ul className={`task-options__options ${showTaskOptions ? 'task-options__options--show' : 'task-options__options--hide'}`}>
                {
                    options.map(option => 
                        <li key={option.name}>
                            <button onClick={() => option.function()} className='task-option-btn'>
                                {option.name}
                            </button>
                        </li>
                    )
                }
            </ul>
        </footer>
    )
}

export default TaskOptions