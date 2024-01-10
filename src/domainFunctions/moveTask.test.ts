import { moveThisTask } from "./moveTask"

describe('Mover una tarea entre columnas', () => {
    test('Una tarea debería moverse a la columna siguiente', () => {
        const taskId = "1"
        const columns = [
            {
                name: "",
                id: "1",
                taskList: [
                    { 
                        descriptionText: "", 
                        id: "1",
                        column: {
                            columnId: '1',
                            columnIndex: 0
                        }
                    }
                ]
            },
            {
                name: "",
                id: "2",
                taskList: []
            }
        ]

        expect(moveThisTask({ taskId, to: 'next-column', columns})).toEqual([
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: [
                    { 
                        descriptionText: "", 
                        id: "1",
                        column: {
                            columnId: '2',
                            columnIndex: 1
                        }
                    }
                ]
            }
        ])
    })

    test('Una tarea debería moverse a la columna anterior', () => {
        const taskId = "1"
        const columns = [
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: [
                    { 
                        descriptionText: "", 
                        id: "1",
                        column: {
                            columnId: '2',
                            columnIndex: 1
                        }
                    }
                ]
            }
        ]

        expect(moveThisTask({ taskId, to: 'prev-column', columns})).toEqual([
            {
                name: "",
                id: "1",
                taskList: [
                    { 
                        descriptionText: "", 
                        id: "1",
                        column: {
                            columnId: '1',
                            columnIndex: 0
                        }   
                    }
                ]
            },
            {
                name: "",
                id: "2",
                taskList: []
            }
        ])
    })

    test('Al intentar mover una tarea en la última columna a la columna siguiente la tarea se quedara donde esta', () => {
        const taskId = "1"
        const columns = [
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: [
                    { 
                        descriptionText: "", 
                        id: "1",
                        column: {
                            columnId: '2',
                            columnIndex: 1
                        }
                    }
                ]
            }
        ]

        expect(moveThisTask({ taskId, to: 'next-column', columns})).toEqual([
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: [
                    { 
                        descriptionText: "", 
                        id: "1",
                        column: {
                            columnId: '2',
                            columnIndex: 1
                        }
                    }
                ]
            }
        ])
    })

    test('Al intentar mover una tarea en la primer columna a la columna anterior la tarea se quedara donde esta', () => {
        const taskId = "1"
        const columns = [
            {
                name: "",
                id: "1",
                taskList: [
                    { 
                        descriptionText: "", 
                        id: "1",
                        column: {
                            columnId: '1',
                            columnIndex: 0
                        }
                    }
                ]
            },
            {
                name: "",
                id: "2",
                taskList: []
            }
        ]

        expect(moveThisTask({ taskId, to: 'prev-column', columns})).toEqual([
            {
                name: "",
                id: "1",
                taskList: [
                    { 
                        descriptionText: "", 
                        id: "1",
                        column: {
                            columnId: '1',
                            columnIndex: 0
                        }
                    }
                ]
            },
            {
                name: "",
                id: "2",
                taskList: []
            }
        ])
    })
    
    test('Las tareas al moverse entre columnas no deberían cambiar su lugar, si en una columna era la primera en la siguiente también sera la primera', () => {
        const taskId = "1"
        const columns = [
            {
                name: "",
                id: "1",
                taskList: [
                    { 
                        descriptionText: "", 
                        id: "1",
                        column: {
                            columnId: '1',
                            columnIndex: 0
                        }
                    }
                ]
            },
            {
                name: "",
                id: "2",
                taskList: [
                    { 
                        descriptionText: "", 
                        id: "2",
                        column: {
                            columnId: '2',
                            columnIndex: 1
                        }
                    }
                ]
            }
        ]

        expect(moveThisTask({ taskId, to: 'next-column', columns})).toEqual([
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: [ 
                    { 
                        descriptionText: "", 
                        id: "1",
                        column: {
                            columnId: '2',
                            columnIndex: 1
                        }
                    }
                    , 
                    { 
                        descriptionText: "", 
                        id: "2",
                        column: {
                            columnId: '2',
                            columnIndex: 1
                        }
                    }
                ]
            }
        ])
    })
})
