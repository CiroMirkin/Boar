
import React from "react";
import { taskList } from "../../models/task";
import { Task } from "../Task";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

interface TaskListArchivedProps {
    taskList: taskList;
    date: string
}

export function TaskListArchived({ taskList: tasks, date }: TaskListArchivedProps) {
    const taskList: React.ReactNode[] = tasks.map(task => 
        <Task data={task} key={task.id}>
        </Task>
    )

    return (
        <>
            <Card key={date} className="px-4">
                <CardHeader>
                    <CardTitle>
                        {date}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                    { taskList }
                </CardContent>
            </Card>
        </>
    );
}
