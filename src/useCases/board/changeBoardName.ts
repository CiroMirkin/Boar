import BusinessError from "@/errors/businessError";
import { boardModel } from "../../models/board";
import { changeNameParams } from "../useCase";

export function changeBoardName({ board, newName }: changeNameParams): boardModel {
    if(!newName.trim()) throw new BusinessError('El tablero debe tener un nobmre.')
        
    const newBoard = board
    newBoard.name = newName
    return newBoard
}