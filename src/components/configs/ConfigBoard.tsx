import { columnModel } from "../../models/column"
import { boardModel } from "@/models/board"
import { Header, USER_IS_IN } from "../Header"
import { ConfigColumns } from "./ConfigColumns"

interface ConfigBoardParams {
    columnList: columnModel[]
    boardData: boardModel
}

export function ConfigBoard({ boardData, columnList }:ConfigBoardParams) {
    return (
        <>
            <Header title="Preferencias" whereUserIs={USER_IS_IN.CONFIG} />
            <div>
                <h2 className="px-6 text-2xl">{boardData.name}</h2>
            </div>
            <ConfigColumns columnList={columnList} />
        </>
    )
}