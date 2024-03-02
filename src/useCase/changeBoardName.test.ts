import { defaultColumnList } from "../models/column"
import { changeBoardName } from "./changeBoardName"

describe('Cambiar el nombre del tablero.', () => {
    test('Se debería cambiar el nombre del tablero.', () => {
        const board = {
            boardData: {
                id: '0',
                name: "Tablero básico"
            },
            columnList: [...defaultColumnList],
            archive: []
        }
        expect(changeBoardName({ board, newName: 'PipiPupu'})).toStrictEqual({
            boardData: {
                id: '0',
                name: "PipiPupu"
            },
            columnList: [...defaultColumnList],
            archive: []
       })
    })
}) 