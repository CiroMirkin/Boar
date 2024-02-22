import React from "react";
import { taskModel } from "./task";
import { boardModel } from "./board";

export interface option {
    id: string
    name: string
    enable: boolean
    icon?: React.ReactNode
}

export interface boardActionParams { 
    task: taskModel, 
    board: boardModel 
}

export interface boardAction {
    action({ task, board }: boardActionParams): boardModel
}

export interface actionData extends option, boardAction {}