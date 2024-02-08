import { getCreateDefaultColumnOption } from "../domainOptions/columnOptions"
import { Btn } from "./atomic/Btn"

export function BoardFooter() {
    const createColumn = getCreateDefaultColumnOption() 
    return (
        <footer className='board-footer'>
            <Btn color={createColumn.color} neoBtn onClickHandler={createColumn.function}>{ createColumn.name }</Btn>
        </footer>
    )
}