import React from "react"
import { Task } from "../Task"
import { Archive as ArchiveModel } from "@/models/archive"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Header, USER_IS_IN } from "../Header"

interface ArchiveProps {
    boardArchive: ArchiveModel
}

export function Archive({ boardArchive}: ArchiveProps) {
    const archive: React.ReactNode[] = []

    boardArchive.forEach(({ tasklist, date }) => {
        const taskListArchived: React.ReactNode[] = []
        tasklist.forEach(task => 
            taskListArchived.push(
                <Task key={task.id} data={task} />
            )
        )
        archive.push(
            <Card key={date} className="px-4">
                <CardHeader>
                    <CardTitle>
                        {date}
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
            <Header title="Archivo" whereUserIs={USER_IS_IN.ARCHIVE}/>
            <div className="mx-6 my-4 flex flex-col gap-y-2">
                { archive.length === 0 
                    ? <EmptyArchive />
                    : archive
                }
            </div>
        </>
    )
}

function EmptyArchive() {
    return (
        <Card className="py-2 px-4">
            <CardHeader>
                <CardTitle>Aún no hay tareas archivadas.</CardTitle>
            </CardHeader>
        </Card>
    )
}