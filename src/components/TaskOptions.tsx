import { useState } from 'react'
import './TaskOptions.css'

interface TaskOptionsProps {
    taskId: string
}

interface options {
    name: string,
    function: Function
}

function TaskOptions({ taskId }: TaskOptionsProps) {
    const [ taskOptionsClassName, setTaskOptionsClassName ] = useState('task-options__options--hide')
    const options: options[] = [
        {
          name: 'Mostrar id por consola', 
          function: () => console.log("Tarea: ", taskId)
        }
    ]

    const toggleTaskOptions = () => {
        const newTaskOptionsClassName = taskOptionsClassName == 'task-options__options--hide' 
            ? 'task-options__options--show' : 'task-options__options--hide'
        setTaskOptionsClassName(newTaskOptionsClassName)
    }

    return (
        <footer className='task-options'>
          <button className='task-options__btn' onClick={toggleTaskOptions}>op</button>
          <ul className={`task-options__options ${taskOptionsClassName}`}>
            {
                options.map(option => 
                    <li key={option.name}>
                        <button onClick={() => option.function()}>
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