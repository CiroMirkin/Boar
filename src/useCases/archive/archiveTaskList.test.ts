import { emptyTask } from "../../models/task"
import { TaskList } from "@/models/taskListInEachColumn"
import { archiveTaskListInTheLastColumn } from "./archiveTaskList"
import { getFullDate } from "../../utils/getTime"

describe("Archivar lista de tareas.", () => {
    test("Se deberían archivar todas las tareas de la columna indicada.", () => {
        const task = {...emptyTask}
        const taskListInEachColumn: TaskList[] = [[{...task}]]
        expect(archiveTaskListInTheLastColumn({ taskListInEachColumn, columnPosition: '1', archive: [] })).toStrictEqual([
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
            return archiveTaskListInTheLastColumn({ taskListInEachColumn: [[]], columnPosition: '1', archive: [] })
        }).toThrow('No hay tareas que archivar.')
    })

    test("No debería haber mas de 30 tareas diarias archivadas.  ESTA PRUEBA PODRÍA SER POCO CONFIABLE.", () => {
        const task = {
            id: '',
            descriptionText: '',
            columnPosition: '1',
        }
        const taskListInEachColumn: TaskList[] = [ [], [], [] ]
        let firstColumnContent = new Array(31).fill(task)
        taskListInEachColumn[2] = firstColumnContent
        expect(() => {
            return archiveTaskListInTheLastColumn({ taskListInEachColumn, columnPosition: '1', archive: [] })
        }).toThrow('El archivo diario esta lleno :(')
    })

    test("No debería haber mas de 60 días archivados.  ESTA PRUEBA PODRÍA SER POCO CONFIABLE.", () => {
        const task = {
            id: '',
            descriptionText: '',
            columnPosition: '1',
        }
        const taskListInEachColumn: TaskList[] = [ [], [], [{...task}] ]
        let archive = new Array(60).fill({
            date: '',
            tasklist: [[]]
        })
        
        expect(() => {
            return archiveTaskListInTheLastColumn({ taskListInEachColumn, columnPosition: '1', archive })
        }).toThrow('El archivo esta lleno :(')
    })
})

describe("Si se archivan varias tareas el mismo dia, estas deberían archivarse juntas porque el archivo es por dia.", () => {
    test("Primer dia, ya hay tareas archivadas y se archivan mas. Todo en el mismo dia.", () => {
        const task = {
            id: '',
            descriptionText: 'Nueva tarea para archivar',
            columnPosition: '1',
        }
        const taskListInEachColumn: TaskList[] = [[{...task}]]
        const archive = [
            {
                date: (getFullDate()),
                tasklist: [
                    {
                        id: '',
                        descriptionText: 'Tarea que ya estaba archivada',
                        columnPosition: '1',
                    }
                ]
            }
        ]
        expect(archiveTaskListInTheLastColumn({ taskListInEachColumn, columnPosition: '1', archive })).toStrictEqual([
            {
                date: (getFullDate()),
                tasklist: [
                    {...task},
                    {
                        id: '',
                        descriptionText: 'Tarea que ya estaba archivada',
                        columnPosition: '1',
                    }
                ]
            }
        ])
    })
    test("Ya se archivaron tareas otro dia. Hoy ya se archivaron tareas y se archivan mas.", () => {
        const task = {
            id: '',
            descriptionText: 'Nueva tarea para archivar',
            columnPosition: '2',
        }
        const taskListInEachColumn: TaskList[] = [[], [{...task}]]
        const archive = [
            {
                date: (getFullDate()),
                tasklist: [
                    {
                        id: '',
                        descriptionText: 'Tarea que ya estaba archivada',
                        columnPosition: '',
                    }
                ]
            },
            {
                date: "Domingo",
                tasklist: [
                    {
                        id: '',
                        descriptionText: '',
                        columnPosition: '',
                    }
                ]
            }
        ]
        expect(archiveTaskListInTheLastColumn({ taskListInEachColumn, columnPosition: '1', archive })).toStrictEqual([
            {
                date: (getFullDate()),
                tasklist: [
                    {
                        id: '',
                        descriptionText: 'Nueva tarea para archivar',
                        columnPosition: '2',
                    },
                    {
                        id: '',
                        descriptionText: 'Tarea que ya estaba archivada',
                        columnPosition: '',
                    }
                ]
            },
            {
                date: "Domingo",
                tasklist: [
                    {
                        id: '',
                        descriptionText: '',
                        columnPosition: '',
                    }
                ]
            }
        ])
    })
})