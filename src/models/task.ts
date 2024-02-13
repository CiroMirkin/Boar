export interface taskModel {
    id: string
    descriptionText: string
    columnPosition: string
    highlight?: boolean
}

export const taskNull: taskModel = {
    id: '',
    descriptionText: '',
    columnPosition: '1',
    highlight: false
}

export type taskList = taskModel[]