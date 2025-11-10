import { test, expect } from '@playwright/test'

test.describe('Creacion y eliminacion de columnas', () => {
	test.beforeEach(async ({ page }) => {
		await page.context().addInitScript(() => {
			Object.defineProperty(navigator, 'language', { value: 'es-ES' })
			Object.defineProperty(navigator, 'languages', { value: ['es-ES', 'es'] })
		})

		await page.goto('/')
		await page.getByRole('button', { name: 'Empezar' }).click()
	})

	test('Puedo crear una columna', async ({ page }) => {
		await page.goto('/settings')
		const columnName = `Prueba ${Date.now()}`

		await test.step('Crear una nueva columna', async () => {
			await page.getByPlaceholder('Nombre de la columna').fill(columnName)
			await page.getByTestId('BotonParaCrearUnaColumna').click()
		})

		await test.step('El nombre de la nueva columna es el correcto', async () => {
			await page.getByTestId('BotonParaCambiarElNombreDeUnaColumna').nth(3).click()
			await expect(page.locator(`input[name="${columnName}"]`)).toBeVisible()
		})

		await test.step('La nueva columna es visible en el tablero', async () => {
			await page.goto('/')
			await expect(page.getByRole('heading', { name: columnName })).toBeVisible()
		})
	})

	test('Crear una columna y eliminar otra', async ({ page }) => {
		await page.goto('/settings')

		await test.step('Eliminar columna "Procesando"', async () => {
			await page
				.locator('li')
				.filter({
					has: page.locator('input[value="Procesando"]'),
				})
				.getByTestId('BotonParaEliminarUnaColumna')
				.click()

			// Confirmar eliminación en el toast
			await page.getByRole('button', { name: 'Eliminar', exact: true }).click()
			await expect(page.locator('input[value="Procesando"]')).not.toBeVisible()
		})

		const columnName = `Prueba ${Date.now()}`
		await test.step('Crear una nueva columna', async () => {
			await page.getByPlaceholder('Nombre de la columna').fill(columnName)
			await page.getByTestId('BotonParaCrearUnaColumna').click()
			await expect(page.locator(`input[name="${columnName}"]`)).toBeVisible()
		})

		await test.step('Verifica que la columna creada sigue existiendo', async () => {
			await expect(page.locator(`input[name="${columnName}"]`)).toBeVisible()
			await page.goto('/')
			await expect(page.getByRole('heading', { name: columnName })).toBeVisible()
		})
	})
})
