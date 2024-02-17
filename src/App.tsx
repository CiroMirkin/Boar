import './App.css'
import { Board } from './components/Board'
import { defaultBoard } from './models/board'

function App() {
  return (
    <>
      <Board data={defaultBoard} ></Board>
    </>
  )
}

export default App
