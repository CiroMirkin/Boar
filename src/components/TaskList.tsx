import { taskModel } from '../models/task'
import Task from './Task'
import './TaskList.css'

interface TaskListProps {
    taskList: taskModel[]
};

function TaskList({ taskList }: TaskListProps) {
  return (
    <ul className="column-task-list">
        {
          taskList.map(task => 
            <Task key={task.id} task={task} /> 
          )
        }
    </ul>
  )
}

export default TaskList