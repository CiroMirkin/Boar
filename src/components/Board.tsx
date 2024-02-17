import React, { useState } from "react"
import { boardModel, defaultBoard } from "../models/board"
import { ColumnList } from "./Column"

export const AllBoardData = React.createContext(defaultBoard as boardModel)
export const UpdateBoardData = React.createContext((newBoardData: boardModel): void => console.log('the set function is not defined, your new board data should be ', newBoardData))

interface BoardProps {
    data: boardModel,
    children?: React.ReactNode
}

export function Board({ data }: BoardProps) {
    const [ allBoardData, setAllBoardData ] = useState(data as boardModel)
    const updateAllBoardData = (newBoardData: boardModel) => setAllBoardData(newBoardData)

    return (
        <>
        <h1>{ allBoardData.boardData.name }</h1>
        <AllBoardData.Provider value={allBoardData}>
            <UpdateBoardData.Provider value={updateAllBoardData}>
                <ColumnList />
            </UpdateBoardData.Provider>
        </AllBoardData.Provider>
        </>
    )
}