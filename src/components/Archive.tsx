import React from "react"
import { Task } from "./Task"
import { archive } from "@/models/archive"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const getArchive = (): archive => {
    return useSelector((state: RootState) => state.archive)
}

interface ArchiveProps { }

export function Archive({}: ArchiveProps) {
    const boardArchive: archive = getArchive()
    const archive: React.ReactNode[] = []

    boardArchive.forEach(({ tasklist, date }) => {
        const taskListArchived: React.ReactNode[] = []
        tasklist.forEach(task => 
            taskListArchived.push(
                <Task key={task.id} data={task}>
                    <Task.TaskDescription />
                </Task>
            )
        )
        archive.push(
            <Card key={date} className="p-2">
                <CardHeader>
                    <CardTitle>
                        <h3>{date}</h3>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                    {taskListArchived}
                </CardContent>
            </Card>
        )
    })

    return (
        <>
            <div className="mx-6 my-4 flex flex-col gap-y-2">
            {archive}
            </div>
        </>
    )
}