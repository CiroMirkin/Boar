import { TaskListArchived } from './components/TaskListArchived'
import { useSession } from '@/SessionProvider'
import { useEffect } from 'react'
import { useArchive } from './hooks/useArchive'
import { useSaveArchive } from './state/useSaveArchive'

export function ArchiveContent() {
    const archive = useArchive()
    
    const { session } = useSession()
    useEffect(() => {
        useSaveArchive({ session, archive })
    }, [archive])

    const archiveView = archive.map(({ tasklist, date }) => (
        <TaskListArchived 
            taskList={tasklist} 
            date={date} 
            key={date} 
        />
    ))

    return (
        <>
            { archiveView }
        </>
    )
}
