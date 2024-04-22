import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import LocalStorageTaskListInEachColumnRepository from './repositories/localStorageTaskLists.ts'
import LocalStorageArchiveRepository from './repositories/localStorageArchive.ts'
import LocalStorageBoardRepository from './repositories/localstorageBoard.ts'

const taskListInEachColumnRepository = new LocalStorageTaskListInEachColumnRepository();
const archiveRepository = new LocalStorageArchiveRepository()
const boardRepository = new LocalStorageBoardRepository()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App taskListInEachColumnRepository={taskListInEachColumnRepository} archiveRepository={archiveRepository} boardRepository={boardRepository} />
    </Provider>
  </React.StrictMode>,
)
