import { taskList, emptyTask } from "../models/task"
import { archiveTaskListInColumn } from "./archiveTaskList"
import { getFullDate } from "../utility/getTime"

describe("Archivar lista de tareas.", () => {
    test("Se deberían archivar todas las tareas de la columna indicada.", () => {
        const task = {...emptyTask}
        const taskListInEachColumn: taskList[] = [[{...task}]]
        expect(archiveTaskListInColumn({ taskListInEachColumn, columnPosition: '1', archive: [] })).toStrictEqual([
            {
                date: (getFullDate()),
                tasklist: [
                    {...task}
                ]
            }
        ])
    })

    test("No se debería poder archivar una lista de tareas vacía.", () => {
        expect(() => {
            return archiveTaskListInColumn({ taskListInEachColumn: [[]], columnPosition: '1', archive: [] })
        }).toThrow('No hay tareas que archivar.')
    })
})