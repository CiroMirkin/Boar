import { useState } from 'react'
import { taskModel } from '../models/task'
import './Task.css'
import TaskOptions from './TaskOptions'
import { Paragraph, textAlign, textWeight } from './atomic/Paragraph'

interface TaskProps {
  task: taskModel,
};

function Task({ task }: TaskProps) {
  const [ showTaskOptions, setShowTaskOptions ] = useState(false)

  const handleClick = () => {
      const newShowTaskOptionsValue = !showTaskOptions
      setShowTaskOptions(newShowTaskOptionsValue)
  }

  return (
    <li className='task' onClick={handleClick}>
        <Paragraph 
          align={textAlign.LEFT}
          weight={textWeight.NORMAL}          
          customClassName="task__text" 
          customStyles={{fontSize: showTaskOptions ? '.7rem' : '1.1rem', lineHeight: showTaskOptions ? '.9rem' : '1.3rem'}}
        >
          { task.highlight && <span className='highlight'></span> }
          { task.descriptionText }
        </Paragraph>
        <Paragraph
          align={textAlign.RIGHT}
          weight={textWeight.NORMAL}          
          customClassName="task-options-hover-text"
          >
            Opciones
          </Paragraph>
        <footer className='task-options'>
          <ul className={`task-options__options ${showTaskOptions ? 'task-options__options--show' : 'task-options__options--hide'}`}>
            <TaskOptions task={task} />
          </ul>
        </footer>
    </li>    
  )
}

export default Task