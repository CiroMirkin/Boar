import { columnModel } from "../models/column";

interface ColumnProps {
    data: columnModel
}

export function Column({ data }: ColumnProps) {
    return (
        <div>
            <h3>{ data.name }</h3>
        </div>
    )
}