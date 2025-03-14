import { store } from '@/store'; 
import { Provider } from 'react-redux'
import { AddNewTaskInput } from "../taskList/AddNewTaskInput";
import { ArchiveTaskListButton } from "../taskList/archive/components/ArchiveTaskListButton";
import { TaskListInEachColumn } from "../taskList/TaskListInEachColumn";
import ColumnListContainer from "./ColumnListContainer";
import { ColumnsContextContent } from "./ColumnsContext";

describe("Lista de columnas y tareas.", () => {
    const textOfTask = 'Tarea creada por y para las pruebas.'
    it("El usuario puede crear una tarea.", () => {
        const columnsData: ColumnsContextContent = {
            firstColumnFooterContent: <AddNewTaskInput/>,
            lastColumnFooterContent: <ArchiveTaskListButton/>,
        }
        cy.mount(
            <Provider store={store}>
                <ColumnListContainer columnsData={columnsData}>
                    { TaskListInEachColumn }
                </ColumnListContainer>
            </Provider>
        )
        cy.get("[id=add_new_task_input]").type(textOfTask)
        cy.get("[id=add_new_task_btn]").click()
        cy.get(".taskList").children().first().contains(textOfTask)
    })
})