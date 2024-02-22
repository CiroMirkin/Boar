import { actionFunctionParams, actionObject } from "../models/option";
import { addTaskInFirstColumn } from "./addTaskInFirstColumn";

export const addTaskToFirstColumAction: actionObject = {
    id: '1',
    name: 'Crear tarea',
    enable: true,
    action: ({ task, board }: actionFunctionParams) => addTaskInFirstColumn({ task, board })
}

export const allTaskActions: actionObject[] = [
    {...addTaskToFirstColumAction},
]