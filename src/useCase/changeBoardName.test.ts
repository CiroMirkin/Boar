import { boardModel } from "@/models/board"
import { changeBoardName } from "./changeBoardName"

describe('Cambiar el nombre del tablero.', () => {
    test('Se debería cambiar el nombre del tablero.', () => {
        const board: boardModel = {
            id: '0',
            name: ""
        }
        expect(changeBoardName({ board, newName: 'PipiPupu'})).toStrictEqual({
            id: '0',
            name: "PipiPupu"
        })
    })
}) 