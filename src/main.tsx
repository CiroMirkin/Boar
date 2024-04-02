import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import LocalStorageTaskListsRepository from './repositories/localStorageTaskLists.ts'

const taskListInEachColumnRepository = new LocalStorageTaskListsRepository();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App taskListInEachColumnRepository={taskListInEachColumnRepository} />
    </Provider>
  </React.StrictMode>,
)
