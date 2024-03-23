import React from "react"
import { Task } from "./Task"
import { archive } from "@/models/archive"

interface ArchiveProps { }

export function Archive({}: ArchiveProps) {
    const boardArchive: archive = []
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
            <div key={date}>
                <h3>{date}</h3>
                {taskListArchived}
            </div>
        )
    })

    return (
        <>
            {archive}
        </>
    )
}