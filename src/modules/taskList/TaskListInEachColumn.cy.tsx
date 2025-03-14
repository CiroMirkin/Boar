import { TaskListInEachColumn } from "./TaskListInEachColumn";

describe("", () => {
    it("Debería devolver una lista vacía si no hay ninguna tarea en la lista.", () => {
        cy.mount(
            <TaskListInEachColumn></TaskListInEachColumn>
        )
        cy.get("[type-btn=delete-input-btn]").click()
        cy.get("[id=input-list]").should('be.empty')
    })
})