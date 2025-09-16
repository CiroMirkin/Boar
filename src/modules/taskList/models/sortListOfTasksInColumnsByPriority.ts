import { sortTasksByPriority } from './sortTasksByPriority'
import { TaskListInEachColumn } from './taskList'

/**
 * Ordena las tareas de cada lista segun la prioridad de sus etiquetas (Tags)
 */
export const sortListOfTasksInColumnsByPriority = (
	listOfTasksInColumns: TaskListInEachColumn
): TaskListInEachColumn => {
	return listOfTasksInColumns.map((taskList) => sortTasksByPriority(taskList))
}
