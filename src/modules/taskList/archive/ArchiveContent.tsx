import LocalStorageArchiveRepository from '@/modules/taskList/archive/state/localStorageArchive'
import { ArchiveRepository } from '@/modules/taskList/archive/models/archiveRepository'
import { TaskListArchived } from './components/TaskListArchived'
import { useSession } from '@/SessionProvider'
import { useEffect } from 'react'
import { useArchive } from './hooks/useArchive'
import { sendForSaveArchive } from './state/sendForSaveArchive'

const archiveRepository: ArchiveRepository = new LocalStorageArchiveRepository()

export function ArchiveContent() {
    const archive = useArchive()
    
    const { session } = useSession()
    useEffect(() => {
        if(!!session) {
            sendForSaveArchive(archive)
        }
        else {
            archiveRepository.save(archive)
        }
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
