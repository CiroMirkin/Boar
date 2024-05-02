import { Column } from "./column";
import { TaskList } from "./taskListInEachColumn";

export interface CompleteColumn extends Column {
    taskList: TaskList
}