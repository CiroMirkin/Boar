import { BlankTask } from "@/sharedByModules/components/BlankTask";
import { taskModel } from "../models/task";
import { TaskInBoardActions } from "../TaskInBoardActions";

export function Task({ task }: { task: taskModel }) {
    return (
        <BlankTask data={task} key={task.id}>
			<BlankTask.ContentCollapse>
				<TaskInBoardActions />
			</BlankTask.ContentCollapse>
		</BlankTask>
    )
}