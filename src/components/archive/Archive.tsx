import React from "react"
import { Archive as ArchiveModel } from "@/models/archive"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Header, USER_IS_IN } from "../Header"
import { TaskListArchived } from "./TaskListArchived"

interface ArchiveProps {
    boardArchive: ArchiveModel
}

export function Archive({ boardArchive}: ArchiveProps) {
    const archive: React.ReactNode[] = []

    boardArchive.forEach(({ tasklist, date }) => {
        archive.push(
            <Card key={date} className="px-4">
                <CardHeader>
                    <CardTitle>
                        {date}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                    <TaskListArchived taskList={tasklist} />
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