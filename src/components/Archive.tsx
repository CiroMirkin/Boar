import React from "react"
import { AllBoardData } from "../App"

interface ArchiveProps { }

export function Archive({}: ArchiveProps) {
    const boardArchive = React.useContext(AllBoardData).archive
    const archive: React.ReactNode[] = []

    boardArchive.forEach(({ tasklist, date }) => {
        const taskListArchived: React.ReactNode[] = []
        tasklist.forEach(task => 
            taskListArchived.push(
                <div key={task.id}>{task.descriptionText}</div>
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