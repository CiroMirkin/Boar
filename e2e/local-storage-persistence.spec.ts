import { test, expect } from '@playwright/test'

test.describe('Prueba de funcionalidad y persistencia local', () => {
  test('Crear tarea y recuperar luego de refrescar la pestaña', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    await page.click('text=Empezar')

    const nombreTarea = `Tarea de prueba ${Date.now()}`
    await page.fill('#add_new_task_btn', nombreTarea)
    await page.click('#plus_btn')
    
    await expect(page.locator(`text=${nombreTarea}`)).toBeVisible()
    await page.reload()
    await expect(page.locator(`text=${nombreTarea}`)).toBeVisible()

    await page.getByText(nombreTarea).click()
    await page.getByRole('button', { name: 'Eliminar tarea' }).waitFor({ state: 'visible' })
    await page.getByRole('button', { name: 'Eliminar tarea' }).click()
  })
})