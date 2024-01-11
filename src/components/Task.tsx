import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { taskModel } from '../models/task'
import './Task.css'
import TaskOptions from './TaskOptions'
import toast from 'react-hot-toast'
import { moveToType } from '../domainFunctions/moveTask'
import { deleteTask, moveTask } from '../redux/columnsSlice'

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

  const handleClick = () => {
      const newShowTaskOptionsValue = !showTaskOptions
      setShowTaskOptions(newShowTaskOptionsValue)
  }

  return (
    <li className='task' onClick={handleClick}>
        <p className="task__text">{task.descriptionText}</p>
        <footer className='task-options'>
          <ul className={`task-options__options ${showTaskOptions ? 'task-options__options--show' : 'task-options__options--hide'}`}>
            <TaskOptions 
              taskId={task.id} 
              deleteTask={deleteTheTask} 
              moveTask={moveTheTask} 
              taskDescription={task.descriptionText} 
            />
          </ul>
        </footer>
    </li>    
  )
}

export default Task