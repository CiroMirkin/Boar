import { Column } from "./column";
import { TaskList } from "./taskList";

export interface CompleteColumn extends Column {
    taskList: TaskList
}