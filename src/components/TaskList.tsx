import React from "react";
import { Task } from "./Task";
import { taskList } from "../models/task";

interface TaskListProps {
    tasks: taskList;
}

export function TaskList({ tasks }: TaskListProps) {
    const taskList: React.ReactNode[] = [];

    tasks.forEach(task => {
        taskList.push(
            <Task data={task} key={task.id} />
        );
    });

    return (
        <>
            {taskList}
        </>
    );
}
