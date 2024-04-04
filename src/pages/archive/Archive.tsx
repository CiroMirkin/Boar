import React from "react"
import { Task } from "../../components/Task"
import { archive } from "@/models/archive"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Header } from "../../components/Header"

interface ArchiveProps {
    boardArchive: archive
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
            <Card key={date} className="p-2">
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
            <Header title="Archivo" />
            <div className="mx-6 my-4 flex flex-col gap-y-2">
                { archive.length === 0 
                    ? <Card className="p-2"><CardHeader><CardTitle>Aún no hay tareas archivadas.</CardTitle></CardHeader></Card> 
                    : archive
                }
            </div>
        </>
    )
}