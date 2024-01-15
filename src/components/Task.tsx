import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { taskModel } from '../models/task'
import './Task.css'
import TaskOptions from './TaskOptions'
import toast from 'react-hot-toast'
import { moveToType } from '../domainFunctions/moveTask'
import { deleteTask, highlightTask, moveTask } from '../redux/columnsSlice'
import { Paragraph, textAlign, textWeight } from './atomic/Paragraph'

interface TaskProps {
  task: taskModel,
};

function Task({ task }: TaskProps) {
  const [ showTaskOptions, setShowTaskOptions ] = useState(false)
  const dispatch = useDispatch();

  const deleteTheTask = () => {
    dispatch(deleteTask(task))
    toast.success('Tarea eliminada')
  }
  const moveTheTask = (to: moveToType, taskId: string) => {
    dispatch(moveTask({ to, taskId }))
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

  const handleClick = () => {
      const newShowTaskOptionsValue = !showTaskOptions
      setShowTaskOptions(newShowTaskOptionsValue)
  }

  const highlightTaskClassName = task.highlight ? 'task--highlight' : ''
  const className = `task ${highlightTaskClassName}`

  return (
    <li className={className} onClick={handleClick}>
        <Paragraph 
          align={textAlign.LEFT}
          weight={textWeight.NORMAL}          
          customClassName="task__text" 
          customStyles={{fontSize: showTaskOptions ? '.7rem' : '1.1rem', lineHeight: showTaskOptions ? '.9rem' : '1.3rem'}}>
          {task.descriptionText}
        </Paragraph>
          <Paragraph
            align={textAlign.RIGHT}
            weight={textWeight.NORMAL}          
            customClassName="task-options-hover-text">
            Opciones
          </Paragraph>
        <footer className='task-options'>
          <ul className={`task-options__options ${showTaskOptions ? 'task-options__options--show' : 'task-options__options--hide'}`}>
            <TaskOptions 
              taskId={task.id} 
              deleteTask={deleteTheTask} 
              moveTask={moveTheTask} 
              highlightTheTask={highlightTheTask}
              taskDescription={task.descriptionText} 
            />
          </ul>
        </footer>
    </li>    
  )
}

export default Task