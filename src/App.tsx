import React, { useState } from "react"
import { boardModel, defaultBoard } from "./models/board"
import { taskModel } from "./models/task"
import './App.css'
import { Board } from './components/Board'
import { getCopyOfTheBoardData } from "./auxiliaryFunction/copyBoardData"
import { columnModel } from "./models/column"

export type boardActionFunction = (data: any) => boardModel;
export interface boardAction {
    action: boardActionFunction;
}

interface boardData {
  board: boardModel
}
const defaultBoardData = { 
  board: defaultBoard 
}

export const BoardData = React.createContext(defaultBoardData as boardData)
interface UpdateBoardDataParams extends boardAction {
  task?: taskModel
  column?: columnModel
}
export const UpdateBoardData = React.createContext(({ action }: UpdateBoardDataParams): void => console.info('The set function is not defined. ', action))


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
      <BoardData.Provider value={{ board: getCopyOfTheBoardData(allBoardData) } as boardData}>
        <UpdateBoardData.Provider value={updateAllBoardData}>
          <Board data={defaultBoard} ></Board>
        </UpdateBoardData.Provider>
        </BoardData.Provider>
    </>
  )
}

export default App
