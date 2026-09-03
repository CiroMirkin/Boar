import { Page } from '@playwright/test'

export async function navigateToMenuItem(page: Page, menuItemName: string): Promise<void> {
	await page.getByTestId('NavBtn').click()
	await page.getByRole('link', { name: menuItemName }).click()
}
