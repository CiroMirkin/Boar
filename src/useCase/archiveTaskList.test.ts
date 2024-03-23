import { taskList, taskNull } from "../models/task"
import { archiveTaskListInColumn } from "./archiveTaskList"
import { getFullDate } from "../utility/getTime"

describe("Archivar lista de tareas.", () => {
    test("Se deberían archivar todas las tareas de la columna indicada.", () => {
        const taskListInEachColumn: taskList[] = [[{...taskNull}]]
        expect(archiveTaskListInColumn({ taskListInEachColumn, columnPosition: '1', archive: [] })).toStrictEqual([
            {
                date: (getFullDate()),
                tasklist: [
                    {...taskNull}
                ]
            }
        ])
    })
})