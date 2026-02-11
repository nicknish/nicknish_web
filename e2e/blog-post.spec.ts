import { test, expect } from '@playwright/test'

test.describe('blog post page', () => {
  test('loads a blog post with content and metadata', async ({ page }) => {
    await page.goto('/blog/cypress-targeting-elements-inside-iframes')

    // Verify the post title renders
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Cypress')

    // Verify date and reading time are displayed in the post header
    const postHeader = page.locator('main header')
    await expect(postHeader.locator('time').first()).toBeVisible()
    await expect(postHeader.getByText(/min read/)).toBeVisible()

    // Verify post body content renders
    await expect(page.locator('main section').first()).toBeVisible()

    // Verify tags are displayed (tags are in a footer after the post content)
    const tagsContainer = page.locator('main section > footer')
    await expect(tagsContainer.getByText('cypress')).toBeVisible()
  })

  test('displays related posts section', async ({ page }) => {
    await page.goto('/blog/cypress-targeting-elements-inside-iframes')

    // Verify related posts section exists
    const relatedSection = page.getByText('Related Posts')
    await expect(relatedSection).toBeVisible()

    // Verify related post links exist
    const relatedLinks = page.locator('section:has-text("Related Posts") a')
    await expect(relatedLinks.first()).toBeVisible()
  })

  test('displays comments section', async ({ page }) => {
    await page.goto('/blog/cypress-targeting-elements-inside-iframes')

    // Verify comments section container exists
    await expect(page.locator('[data-target="comments"]')).toBeVisible()
  })
})
