import React, { useState } from "react"
import { boardModel, defaultBoard } from "../models/board"
import { ColumnList } from "./ColumnList"
import { taskModel } from "../models/task"
import { boardAction } from "../models/board"
import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData"

export const AllBoardData = React.createContext(defaultBoard as boardModel)
interface UpdateBoardDataParams extends boardAction {
    task: taskModel
}
export const UpdateBoardData = React.createContext(({ action, task }: UpdateBoardDataParams): void => console.info('The set function is not defined. ', action, task))

interface BoardProps {
    data: boardModel,
    children?: React.ReactNode
}

export function Board({ data }: BoardProps) {
    const [ allBoardData, setAllBoardData ] = useState(data as boardModel)
    const updateAllBoardData = ({ action, task }: UpdateBoardDataParams): void => {
        const newBoardData = action({ board: allBoardData, task })
        setAllBoardData(newBoardData)
    }

    return (
        <>
        <h1>{ allBoardData.boardData.name }</h1>
        <AllBoardData.Provider value={getCopyOfTheBoardData(allBoardData)}>
            <UpdateBoardData.Provider value={updateAllBoardData}>
                <ColumnList />
            </UpdateBoardData.Provider>
        </AllBoardData.Provider>
        </>
    )
}