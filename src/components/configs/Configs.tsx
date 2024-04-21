import { columnModel } from "../../models/column"
import { boardModel } from "@/models/board"
import { Header, USER_IS_IN } from "../Header"
import { ConfigColumns } from "./ConfigColumns"
import { Separator } from "@/ui/separator"
import { ChangeBoardName } from "./ChangeBoardName"

interface ConfigBoardParams {
    columnList: columnModel[]
    boardData: boardModel
}

export function Configs({ boardData, columnList }:ConfigBoardParams) {
    return (
        <>
            <Header title="Ajustes" whereUserIs={USER_IS_IN.CONFIG} />
            <div className="py-4 md:px-11 px-6">
                <h2 className="text-2xl">Tablero</h2>
                <div className="my-5 flex">
                    <ChangeBoardName name={boardData.name} />
                </div>
            </div>
            <Separator />
            <div className="py-4 md:px-11 px-6">
                <h2 className="text-2xl">Columnas</h2>
                <ConfigColumns columnList={columnList} />
                <Separator />
            </div>
        </>
    )
}