import { action } from "../models/option";
import { addTaskInFirstColumn } from "./addTaskInFirstColumn";

export const taskOptions: action[] = [
    {
        id: '1',
        name: 'Crear tarea',
        enable: true,
        action: ({ task, board }) => addTaskInFirstColumn({ task, board })
    }
]