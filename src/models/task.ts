export interface taskModel {
    descriptionText: string,
    highlight?: boolean,
    column: {
        columnIndex: number,
        columnId: string
    },
    id: string
}

export const taskNull: taskModel = {
    id: '',
    descriptionText: '',
    highlight: false,
    column: {
        columnIndex: 0,
        columnId: '1'
    }
}