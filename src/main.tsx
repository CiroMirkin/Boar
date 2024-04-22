import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import LocalStorageBoardRepository from './repositories/localstorageBoard.ts'

const boardRepository = new LocalStorageBoardRepository()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App boardRepository={boardRepository} />
    </Provider>
  </React.StrictMode>,
)
