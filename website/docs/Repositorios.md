---
description: Repositorios
tags: 
  - LocalStorage  
  - Repositorio
  - Almacenamiento
---
# Repositorios

Las interfaces de los repositorios están dentro de la carpeta `src/models` y las implementaciones están en la carpeta `src/repositories`.

## ¿Que es un repositorio?

Un repositorio es un patron diseño que permite desacoplar la fuente de información.

## Implementación

Desde aquí se puede cambiar la implementación de repositorio.

```tsx title="/src/main.tsx"
// ...
import LocalStorageTaskListInEachColumnRepository from './repositories/localStorageTaskLists.ts'
import LocalStorageColumnListRepository from './repositories/localStorageColumnList.ts'
import LocalStorageArchiveRepository from './repositories/localStorageArchive.ts'

// highlight-next-line
const taskListInEachColumnRepository = new LocalStorageTaskListInEachColumnRepository()
// highlight-next-line
const columnListRepository = new LocalStorageColumnListRepository()
// highlight-next-line
const archiveRepository = new LocalStorageArchiveRepository()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    // highlight-next-line
      <App 
      // highlight-next-line
        taskListInEachColumnRepository={taskListInEachColumnRepository} 
        // highlight-next-line
        columnListRepository={columnListRepository} 
        // highlight-next-line
        archiveRepository={archiveRepository}
        // highlight-next-line
        />
    </Provider>
  </React.StrictMode>,
)
```

Aquí se usa la implementación.

```tsx title="/src/App.tsx"
// ...
import { TaskListInEachColumnRepository } from './models/taskListRepository'
import { ColumnListRepository } from './models/columnListRepository'
import { ArchiveRepository } from './models/archiveRepository'

// ...

interface AppProps {
  taskListInEachColumnRepository: TaskListInEachColumnRepository
  columnListRepository: ColumnListRepository
  archiveRepository: ArchiveRepository
}

function App({ taskListInEachColumnRepository, columnListRepository, archiveRepository }: AppProps) {
    const columnList = getColumnList()
    const taskListInEachColumn = getTaskListInEachColumn()
    const archive = getArchive()

    useEffect(() => {
        taskListInEachColumnRepository.save(taskListInEachColumn)
    }, [taskListInEachColumn])

    useEffect(() => columnListRepository.save(columnList), [columnList])

    useEffect(() => archiveRepository.save(archive), [archive])

    // ...
}
export default App
```