import { columnModel } from "../../models/column"
import { boardModel } from "@/models/board"
import { Header } from "../../components/Header"
import { ConfigColumns } from "./ConfigColumns"

interface ConfigBoardParams {
    columnList: columnModel[]
    boardData: boardModel
}

export function ConfigBoard({ boardData, columnList }:ConfigBoardParams) {
    return (
        <>
            <Header title="Preferencias" />
            <div>
                <h2 className="px-6 text-2xl">{boardData.name}</h2>
            </div>
            <ConfigColumns columnList={columnList} />
        </>
    )
}