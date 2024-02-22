import React from "react";
import { boardAction } from "./board";

export interface option {
    id: string
    name: string
    enable: boolean
    icon?: React.ReactNode
}

export interface actionData extends option, boardAction {}