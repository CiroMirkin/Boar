import { taskModel } from '../models/task'
import Task from './Task'
import './TaskList.css'

interface TaskListProps {
    taskList: taskModel[],
    deleteTask: Function
};

function TaskList({ taskList, deleteTask }: TaskListProps) {
  return (
    <ul className="column-task-list">
        {
            taskList.map(task => 
                <Task key={task.id} id={task.id} descriptionText={task.descriptionText} deleteTask={deleteTask} /> 
            )
        }
    </ul>
  )
}

export default TaskList