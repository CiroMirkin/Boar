import { boardActionParams, actionData } from "../models/option";
import { addTaskInFirstColumn } from "./addTaskInFirstColumn";

export const addTaskToFirstColumAction: actionData = {
    id: '1',
    name: 'Crear tarea',
    enable: true,
    action: ({ task, board }: boardActionParams) => addTaskInFirstColumn({ task, board })
}

export const allTaskActions: actionData[] = [
    {...addTaskToFirstColumAction},
]