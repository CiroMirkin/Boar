import BusinessError from "@/errors/businessError"

export interface boardModel {
    id: string,
    name: string
}

export const isThisBoardNameWithinTheLimitOfLetters = (boardName: string): boolean => {
    return boardName.length < 30
}

export const isThisBoardNameValid = (boardName: string): boolean | BusinessError => {
    if(!boardName.trim()) throw new BusinessError('No puede estar en blanco.')
    else if(!isThisBoardNameWithinTheLimitOfLetters(boardName)) throw new BusinessError('El nombre es demasiado largo.')
    return true
}