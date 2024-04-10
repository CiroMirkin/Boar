import { columnModel } from "../../models/column"
import { boardModel } from "@/models/board"
import { Header, USER_IS_IN } from "../Header"
import { ConfigColumns } from "./ConfigColumns"
import { Separator } from "@/ui/separator"

interface ConfigBoardParams {
    columnList: columnModel[]
    boardData: boardModel
}

export function ConfigBoard({ boardData, columnList }:ConfigBoardParams) {
    console.log(boardData)
    return (
        <>
            <Header title="Ajustes" whereUserIs={USER_IS_IN.CONFIG} />
            <div className="p-4">
                <h2 className="px-6 text-2xl">Columnas</h2>
                <ConfigColumns columnList={columnList} />
                <Separator />
            </div>
        </>
    )
}