import React from "react"
import { Archive as ArchiveModel } from "@/models/archive"
import { Card, CardHeader, CardTitle } from "../../ui/card"
import { Header, USER_IS_IN } from "../Header"
import { TaskListArchived } from "./TaskListArchived"

interface ArchiveProps {
    boardArchive: ArchiveModel
}

export function Archive({ boardArchive}: ArchiveProps) {
    const archive: React.ReactNode[] = []

    boardArchive.forEach(({ tasklist, date }) => {
        archive.push(
            <TaskListArchived taskList={tasklist} date={date} key={date} />
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