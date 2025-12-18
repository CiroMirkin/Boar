import { updateNotesAndCommentsOfThisTask } from './updateNotesAndCommentsOfThisTask'
import { taskModel } from '@/modules/TaskBoard/model/task'
import { TaskListInEachColumn } from '../models/taskList'

describe('Actualizar las notas de una tarea.', () => {
	it('Se deberia actualizar el contenido de las notas de una tarea.', () => {
		const taskToUpdate: taskModel = {
			id: '1',
			descriptionText: 'Task 1',
			notesAndComments: '',
		}

		const listOfTaskInColumns: TaskListInEachColumn = [[taskToUpdate], [], []]

		const notes = 'These are the updated notes.'

		const updatedList = updateNotesAndCommentsOfThisTask({
			taskToUpdate,
			notes,
			listOfTaskInColumns,
		})

		expect(updatedList[0][0].notesAndComments).toBe(notes)
	})

	it('No se deberia actualizar el contenido de las notas de una tarea si el contenido supera el maximo permitido.', () => {
		const taskToUpdate: taskModel = {
			id: '1',
			descriptionText: 'Task 1',
			notesAndComments: '',
		}

		const listOfTaskInColumns: TaskListInEachColumn = [[taskToUpdate], [], []]

		const notes = 'a'.repeat(5001)

		const updatedList = updateNotesAndCommentsOfThisTask({
			taskToUpdate,
			notes,
			listOfTaskInColumns,
		})

		expect(updatedList[0][0].notesAndComments).toBe('')
	})

	it('Deberia actualizar notas con exactamente 5000 caracteres (límite máximo).', () => {
		const taskToUpdate: taskModel = {
			id: '1',
			descriptionText: 'Task 1',
			notesAndComments: '',
		}

		const listOfTaskInColumns: TaskListInEachColumn = [[taskToUpdate], [], []]

		const notes = 'a'.repeat(5000)

		const updatedList = updateNotesAndCommentsOfThisTask({
			taskToUpdate,
			notes,
			listOfTaskInColumns,
		})

		const updatedNotes = updatedList[0][0].notesAndComments
		expect(updatedNotes).toBe(notes)
		expect(updatedNotes?.length).toBe(5000)
	})

	it('Deberia actualizar las notas a una cadena vacía.', () => {
		const taskToUpdate: taskModel = {
			id: '1',
			descriptionText: 'Task 1',
			notesAndComments: 'Old notes',
		}

		const listOfTaskInColumns: TaskListInEachColumn = [[taskToUpdate], [], []]

		const notes = ''

		const updatedList = updateNotesAndCommentsOfThisTask({
			taskToUpdate,
			notes,
			listOfTaskInColumns,
		})

		expect(updatedList[0][0].notesAndComments).toBe('')
	})

	it('Deberia actualizar notas con caracteres especiales y unicode.', () => {
		const taskToUpdate: taskModel = {
			id: '1',
			descriptionText: 'Task 1',
			notesAndComments: '',
		}

		const listOfTaskInColumns: TaskListInEachColumn = [[taskToUpdate], [], []]

		const notes = 'Notas con émojis 🚀💡 y símbolos especiales: @#$%^&*()'

		const updatedList = updateNotesAndCommentsOfThisTask({
			taskToUpdate,
			notes,
			listOfTaskInColumns,
		})

		expect(updatedList[0][0].notesAndComments).toBe(notes)
	})

	it('Deberia actualizar notas con saltos de línea y espacios especiales.', () => {
		const taskToUpdate: taskModel = {
			id: '1',
			descriptionText: 'Task 1',
			notesAndComments: '',
		}

		const listOfTaskInColumns: TaskListInEachColumn = [[taskToUpdate], [], []]

		const notes = 'Línea 1\nLínea 2\n\tTabulación'

		const updatedList = updateNotesAndCommentsOfThisTask({
			taskToUpdate,
			notes,
			listOfTaskInColumns,
		})

		expect(updatedList[0][0].notesAndComments).toBe(notes)
	})

	it('Deberia actualizar notas cuando la tarea no tiene la propiedad notesAndComments inicialmente.', () => {
		const taskToUpdate: taskModel = {
			id: '1',
			descriptionText: 'Task 1',
			// notesAndComments es undefined
		}

		const listOfTaskInColumns: TaskListInEachColumn = [[taskToUpdate], [], []]

		const notes = 'New notes added'

		const updatedList = updateNotesAndCommentsOfThisTask({
			taskToUpdate,
			notes,
			listOfTaskInColumns,
		})

		expect(updatedList[0][0].notesAndComments).toBe(notes)
	})
})
