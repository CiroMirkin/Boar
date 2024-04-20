import { emptyTask } from "@/models/task"
import { archiveThisTask } from "./archiveTask"
import { Archive } from "@/models/archive";
import { getFullDate } from "@/utils/getTime";

describe('Archivar una tarea.', () => {
    test('Se debería archivar la tarea indicada.', () => {
        const task = {...emptyTask};
        const archive: Archive = []
        expect(archiveThisTask({ task, archive})).toStrictEqual([
            {
                date: (getFullDate()),
                tasklist: [
                    {
                       ...task
                    }
                ]
            }
        ])
    })

    test('La tarea archivada debería estar al inicio de la lista de tareas archivadas.', () => {
        const task = {
            id: "",
            descriptionText: "pipi", 
            columnPosition: '2',
        }
        const archive: Archive = [
            {
                date: (getFullDate()),
                tasklist: [
                    {
                        id: "",
                        descriptionText: "pupu", 
                        columnPosition: '2',
                    },
                ]
            }
        ]
        expect(archiveThisTask({ task, archive})).toStrictEqual([
            {
                date: (getFullDate()),
                tasklist: [
                    {
                        id: "",
                        descriptionText: "pipi", 
                        columnPosition: '2',
                    },
                    {
                        id: "",
                        descriptionText: "pupu", 
                        columnPosition: '2',
                    }
                ]
            }
        ])
    })

    test("Se archiva la tarea y ya hay tareas archivadas ese mismo dia y otros.", () => {
        const task = {
            id: "",
            descriptionText: "tarea que el usuario archiva", 
            columnPosition: '',
        }
        const archive: Archive = [
            {
                date: (getFullDate()),
                tasklist: [
                    {
                        id: "",
                        descriptionText: "tarea que ya estaba archivada", 
                        columnPosition: '',
                    },
                ]
            },
            {
                date: "domingo",
                tasklist: [
                    {
                        id: "",
                        descriptionText: "",
                        columnPosition: ""
                    }
                ]
            }
        ]

        expect(archiveThisTask({ task, archive})).toStrictEqual([
            {
                date: (getFullDate()),
                tasklist: [
                    {
                        id: "",
                        descriptionText: "tarea que el usuario archiva", 
                        columnPosition: '',
                    },
                    {
                        id: "",
                        descriptionText: "tarea que ya estaba archivada", 
                        columnPosition: '',
                    },
                ]
            },
            {
                date: "domingo",
                tasklist: [
                    {
                        id: "",
                        descriptionText: "",
                        columnPosition: ""
                    }
                ]
            }
        ])
    })

    test("No se debería poder archivar la tarea si ya hay 30 tareas archivadas.  ESTA PRUEBA PODRÍA SER POCO CONFIABLE.", () => {
        const task = {
            id: '',
            descriptionText: '',
            columnPosition: '1',
        }
        const archive: Archive = [
            {
                date: (getFullDate()),
                tasklist: (new Array(30).fill({...emptyTask}))
            }
        ]

        expect(() => {
            return archiveThisTask({ task, archive })
        }).toThrow('El archivo diario esta lleno :(')
    })
})