
import React from "react";
import { taskList } from "../../models/task";
import { Task } from "../Task";

interface TaskListArchivedProps {
    taskList: taskList;
}

export function TaskListArchived({ taskList: tasks }: TaskListArchivedProps) {
    const taskList: React.ReactNode[] = tasks.map(task => 
        <Task data={task} key={task.id}>
        </Task>
    )

    return (
        <>
            <div className="flex flex-col gap-y-2">
                { taskList }
            </div>
        </>
    );
}
