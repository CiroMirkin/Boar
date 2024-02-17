import { action } from "../models/option";
import { addTaskInFirstColumn } from "./addTaskInFirstColumn";

export const addTaskToFirstColumAction: action = {
    id: '1',
    name: 'Crear tarea',
    enable: true,
    action: ({ task, board }) => addTaskInFirstColumn({ task, board })
}

export const taskOptions: action[] = [
    {...addTaskToFirstColumAction},
]