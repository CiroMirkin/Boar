import React from "react";
import { columnModel } from "../models/column";

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    return (
        <div>
            <h3>{ data.name }</h3>
            { children }
        </div>
    )
}