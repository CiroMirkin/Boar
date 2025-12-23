import test, { expect } from '@playwright/test'

test.describe('Crear y archivar notas dentro del tablero', () => {
	test.beforeEach(async ({ page }) => {
		await page.context().addInitScript(() => {
			Object.defineProperty(navigator, 'language', { value: 'es-ES' })
			Object.defineProperty(navigator, 'languages', { value: ['es-ES', 'es'] })
		})

		await page.goto('/')
		await page.getByRole('button', { name: 'Empezar' }).click()
	})

	test('Puedo crear y archivar una nota en el tablero', async ({ page }) => {
		const noteText = 'nota pipipupu'
		await test.step('Puedo escribir una nota', async () => {
			await page.getByRole('button', { name: 'Notas' }).click()
			await page.locator('.tiptap').fill(noteText)
			await expect(page.getByText(noteText)).toBeVisible()
		})

		await test.step('Puedo archivar una nota', async () => {
			await page.getByTestId('BotonParaArchiarUnaNota').click()
			await expect(page.getByText(noteText)).toBeHidden({ timeout: 5000 })
		})

		await test.step('La nota archivada esta en el archivo', async () => {
			await page.getByRole('button', { name: 'Close', exact: true }).click()
			await page.goto('/archive')
			await page.getByRole('tab', { name: 'Notas' }).click()
			await expect(page.getByText(noteText)).toBeVisible()
		})
	})
})
