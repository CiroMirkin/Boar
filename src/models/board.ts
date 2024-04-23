export interface boardModel {
    id: string,
    name: string
}

export const isThisBoardNameValid = (boardName: string): boolean => {
    return !!boardName.trim() && boardName.length < 30
}