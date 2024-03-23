import React, { useState } from "react"
import { boardModel, defaultBoard } from "./models/board"
import './App.css'
import { Board } from './components/Board'
import { getCopyOfTheBoardData } from "./utility/copyBoardData"

export type boardActionFunction = (data: any) => boardModel;
export interface boardAction {
    action: boardActionFunction;
}

interface boardData {
  board: boardModel,
}
const defaultBoardData = { 
  board: defaultBoard
}

export const BoardData = React.createContext(defaultBoardData as boardData)


function App() {
  const [ allBoardData, setAllBoardData ] = useState(defaultBoard)

  return (
    <>
      <BoardData.Provider value={{ board: getCopyOfTheBoardData(allBoardData) } as boardData}>
        <Board data={defaultBoard} ></Board>
      </BoardData.Provider>
    </>
  )
}

export default App
