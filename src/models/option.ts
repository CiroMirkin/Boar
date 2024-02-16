import React from "react";
import { taskModel } from "./task";
import { boardModel } from "./board";

export interface option {
    id: string
    name: string
    enable: boolean
    icon?: React.ReactNode
}

interface actionFunctionParams { 
    task: taskModel, 
    board: boardModel 
}

export interface action extends option {
    action({ task, board }: actionFunctionParams): boardModel
}