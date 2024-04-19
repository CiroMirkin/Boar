import React from "react";
import { TaskList as taskList } from "@/models/taskListInEachColumn";
import { TaskInBoardActions } from "./TaskInBoardActions";
import { Task } from "../Task";

interface TaskListProps {
    tasks: taskList;
}

export function TaskList({ tasks }: TaskListProps) {
    const taskList: React.ReactNode[] = [];

    tasks.forEach(task => {
        taskList.push(
            <Task data={task} key={task.id}>
                <Task.TaskActions>
                    <TaskInBoardActions/>
                </Task.TaskActions>
            </Task>
        );
    });

    return (
        <>
            <div className="flex flex-col gap-y-2">
            {taskList}
            </div>
        </>
    );
}
