import React from "react"
import { BoardData } from "../App"
import { Task } from "./Task"

interface ArchiveProps { }

export function Archive({}: ArchiveProps) {
    const boardArchive = React.useContext(BoardData).board.archive
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