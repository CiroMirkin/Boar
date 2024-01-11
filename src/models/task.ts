export interface taskModel {
    descriptionText: string,
    column: {
        columnIndex: number,
        columnId: string
    },
    id: string
}

export const taskNull: taskModel = {
    id: '',
    descriptionText: '',
    column: {
        columnIndex: 0,
        columnId: '1'
    }
}