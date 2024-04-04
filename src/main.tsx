import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import LocalStorageTaskListInEachColumnRepository from './repositories/localStorageTaskLists.ts'
import LocalStorageColumnListRepository from './repositories/localStorageColumnList.ts'

const taskListInEachColumnRepository = new LocalStorageTaskListInEachColumnRepository();
const columnListRepository = new LocalStorageColumnListRepository()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App taskListInEachColumnRepository={taskListInEachColumnRepository} columnListRepository={columnListRepository} />
    </Provider>
  </React.StrictMode>,
)
