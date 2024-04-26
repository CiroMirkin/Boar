import './App.css'
import { Board } from './components/board/Board'
import { Toaster } from './ui/toaster'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Archive } from './components/archive/Archive'
import { Configs } from './components/configs/Configs'
import { Erro404 } from './components/404/404'
import { Help } from './components/help/Help'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' 
            element={
              <Board />
            }
          />
          <Route path='/archive' 
            element={
              <Archive />
            }
          />
          <Route path='/settings' 
            element={
              <Configs/>
            }
          />
          <Route path='/help' 
            element={
              <Help />
            }
          />
          <Route path='*' element={ <Erro404 /> } />
        </Routes>
      </Router>
      <Toaster/>
    </>
  )
}

export default App
