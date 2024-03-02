import React, { useState } from "react"
import { boardModel, defaultBoard } from "./models/board"
import { boardAction } from "./models/board"
import { taskModel } from "./models/task"
import './App.css'
import { Board } from './components/Board'
import { getCopyOfTheBoardData } from "./auxiliaryFunction/copyBoardData"

export const AllBoardData = React.createContext(defaultBoard as boardModel)
interface UpdateBoardDataParams extends boardAction {
    task: taskModel
}
export const UpdateBoardData = React.createContext(({ action, task }: UpdateBoardDataParams): void => console.info('The set function is not defined. ', action, task))


function App() {
  const [ allBoardData, setAllBoardData ] = useState(defaultBoard)
  const updateAllBoardData = ({ action, task }: UpdateBoardDataParams): void => {
      const newBoardData = action({ board: allBoardData, task })
      setAllBoardData(newBoardData)
  }

  return (
    <>
      <AllBoardData.Provider value={getCopyOfTheBoardData(allBoardData)}>
        <UpdateBoardData.Provider value={updateAllBoardData}>
          <Board data={defaultBoard} ></Board>
        </UpdateBoardData.Provider>
        </AllBoardData.Provider>
    </>
  )
}

export default App
