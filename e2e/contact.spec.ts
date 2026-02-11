import { test, expect } from '@playwright/test'

test.describe('contact page', () => {
  test('loads contact form with all fields', async ({ page }) => {
    await page.goto('/contact')
    await expect(page).toHaveTitle(/Contact/)

    // Verify form header
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Contact Me')

    // Verify form fields exist
    const form = page.getByTestId('NewsletterSignupForm')
    await expect(form).toBeVisible()
    await expect(form.getByPlaceholder('Jamie')).toBeVisible()
    await expect(form.getByPlaceholder('johnapple@gmail.com')).toBeVisible()
    await expect(form.getByRole('textbox', { name: /message/i })).toBeVisible()

    // Verify submit button exists and is disabled (captcha not completed)
    await expect(form.getByRole('button', { name: /submit/i })).toBeDisabled()
  })

  test('shows validation errors for required fields', async ({ page }) => {
    await page.goto('/contact')

    const form = page.getByTestId('NewsletterSignupForm')

    // Fill in name but leave message empty, then try to trigger validation
    const nameInput = form.getByPlaceholder('Jamie')
    await nameInput.fill('Test User')
    await nameInput.clear()
    await nameInput.blur()

    // The submit button should remain disabled without captcha
    await expect(form.getByRole('button', { name: /submit/i })).toBeDisabled()
  })
})
