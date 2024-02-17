import { taskModel } from "../models/task";

interface TaskProps {
    data: taskModel
}

export function Task({ data }: TaskProps) {
    return (
        <div>
            <p>{ data.descriptionText }</p>
        </div>
    )
}