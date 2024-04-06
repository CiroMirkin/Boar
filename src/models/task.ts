export interface taskModel {
    id: string
    descriptionText: string
    columnPosition: string
}

export const emptyTask: taskModel = {
    id: '',
    descriptionText: '',
    columnPosition: '1',
}

export type taskList = taskModel[]

export const getNewTask = ({ descriptionText, columnPosition }: { descriptionText: string, columnPosition: string }): taskModel => {
    descriptionText = descriptionText.trim()
    if (!descriptionText) throw('No se puede crear una tarea sin descripción.')
    
    return {
        id: crypto.randomUUID(),
        descriptionText,
        columnPosition,
    }
}