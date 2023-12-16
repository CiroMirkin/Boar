import { useState } from 'react'
import './TaskOptions.css'

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
    const [ taskOptionsClassName, setTaskOptionsClassName ] = useState('task-options__options--hide')
    const options: options[] = [
        {
            name: "Avanzar",
            function: () => moveTask('next-column', taskId)
        },
        {
            name: "Retroceder",
            function: () => moveTask('prev-column', taskId)
        },
        {
          name: 'Eliminar', 
          function: () => deleteTask(taskId)
        },
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