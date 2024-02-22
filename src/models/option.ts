import React from "react";
import { taskModel } from "./task";
import { boardModel } from "./board";

export interface option {
    id: string
    name: string
    enable: boolean
    icon?: React.ReactNode
}

export interface actionFunctionParams { 
    task: taskModel, 
    board: boardModel 
}

export interface boardAction {
    action({ task, board }: actionFunctionParams): boardModel
}
export interface actionObject extends option, boardAction {}