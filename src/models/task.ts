import BusinessError from "@/errors/businessError"

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

export const isThisTaskDescriptionValid = (taskDescription: string): boolean => !!taskDescription.trim()

export const getNewTask = ({ descriptionText, columnPosition }: { descriptionText: string, columnPosition: string }): taskModel => {
    if (!isThisTaskDescriptionValid(descriptionText)) throw new BusinessError('No se puede crear una tarea sin descripción.')
    
    return {
        id: crypto.randomUUID(),
        descriptionText,
        columnPosition,
    }
}