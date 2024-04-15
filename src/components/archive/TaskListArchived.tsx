
import React from "react";
import { taskList } from "../../models/task";
import { Task } from "../Task";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

interface TaskListArchivedProps {
    taskList: taskList;
    date: string
}

export function TaskListArchived({ taskList, date }: TaskListArchivedProps) {
    return (
        <>
            <Card key={date} className="px-4">
                <CardHeader>
                    <CardTitle>
                        {date}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                    <TaskList taskList={taskList} />
                </CardContent>
            </Card>
        </>
    );
}

function TaskList({ taskList }: { taskList: taskList }) {
    const tasks: React.ReactNode[] = taskList.map(task => 
        <Task data={task} key={task.id}>
        </Task>
    )
    return(<>{ tasks }</>)
}
