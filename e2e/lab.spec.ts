import { test, expect } from '@playwright/test'

test.describe('lab page', () => {
  test('displays experiments and navigates to an experiment', async ({ page }) => {
    await page.goto('/lab')
    await expect(page).toHaveTitle(/The Lab/)

    // Verify the page header
    await expect(page.getByRole('heading', { level: 1 })).toContainText('The Lab')

    // Verify experiments section exists
    await expect(page.getByRole('heading', { name: 'Experiments' })).toBeVisible()

    // Click through to the AI Snake Game experiment
    await page.getByRole('link', { name: /AI Snake/i }).first().click()
    await expect(page).toHaveURL('/lab/ai-snake-game')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('AI Snake')

    // Navigate back to lab
    await page.getByRole('link', { name: /Back to the Lab/i }).click()
    await expect(page).toHaveURL('/lab')
  })
})
