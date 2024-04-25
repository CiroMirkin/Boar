import React, { createContext, useContext } from "react";
import { columnModel, columnNull } from "../../models/column";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/ui/card"  
import { isThisColumnTheFirst } from "@/utils/isThisColumnTheFirst";
import { isThisColumnTheLast } from "@/utils/isThisColumnTheLast";
import { AddNewTaskInput } from "./AddNewTaskInput";
import { ArchiveTaskListButton } from "./ArchiveTaskListButton";

const ColumnContext = createContext(columnNull)

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    return (
        <ColumnContext.Provider value={data} >
            <Card className="h-auto min-w-80 flex-1 flex flex-col justify-between">
                <CardHeader>
                    <CardTitle>{ data.name }</CardTitle>
                </CardHeader>
                
                { children }
            </Card>
        </ColumnContext.Provider>
    )
}

function ColumnContent({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <CardContent className={className ? className : ''}>
            
            { children }

        </CardContent>
    )
}
Column.ColumnContent = ColumnContent

function ColumnFooter() { 
    const data = useContext(ColumnContext)

    return (
        <CardFooter className="min-h-16">
            {
                isThisColumnTheFirst(data) && <AddNewTaskInput />
            }
            { isThisColumnTheLast(data) &&  <ArchiveTaskListButton /> }
        </CardFooter>
    )
}
Column.Footer = ColumnFooter