import React, { useState } from "react"
import { boardModel, defaultBoard } from "./models/board"
import { taskModel } from "./models/task"
import './App.css'
import { Board } from './components/Board'
import { getCopyOfTheBoardData } from "./utility/copyBoardData"
import { columnModel } from "./models/column"

export type boardActionFunction = (data: any) => boardModel;
export interface boardAction {
    action: boardActionFunction;
}

interface UpdateBoardDataParams extends boardAction {
  task?: taskModel
  column?: columnModel
}
interface boardData {
  board: boardModel,
  update: ({ }: UpdateBoardDataParams) => void
}
const defaultBoardData = { 
  board: defaultBoard,
  update: ({ action }: UpdateBoardDataParams): void => console.info('The set function is not defined. ', action)
}

export const BoardData = React.createContext(defaultBoardData as boardData)


function App() {
  const [ allBoardData, setAllBoardData ] = useState(defaultBoard)
  const updateAllBoardData = ({ action, task, column }: UpdateBoardDataParams): void => {
    if(task) {
      const newBoardData = action({ board: allBoardData, task })
      setAllBoardData(newBoardData)
    }
    if(column) {
      const newBoardData = action({ board: allBoardData, column })
      setAllBoardData(newBoardData)
    }
  }

  return (
    <>
      <BoardData.Provider value={{ board: getCopyOfTheBoardData(allBoardData), update: updateAllBoardData } as boardData}>
        <Board data={defaultBoard} ></Board>
      </BoardData.Provider>
    </>
  )
}

export default App
