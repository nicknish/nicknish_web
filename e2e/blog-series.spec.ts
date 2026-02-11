import { test, expect } from '@playwright/test'

test.describe('blog series page', () => {
  test('loads series with banner image and posts list', async ({ page }) => {
    await page.goto('/series/explain-like-im-5')

    // Verify series title
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    // Verify banner image renders
    await expect(page.locator('figure img')).toBeVisible()

    // Verify series posts are listed
    const postLinks = page.locator('a:has(h2)')
    await expect(postLinks.first()).toBeVisible()
    const count = await postLinks.count()
    expect(count).toBeGreaterThan(0)
  })

  test('clicking a series post navigates to the blog post', async ({ page }) => {
    await page.goto('/series/explain-like-im-5')

    // Click the first post in the series
    const firstPostLink = page.locator('a:has(h2)').first()
    const postTitle = await firstPostLink.locator('h2').textContent()
    const href = await firstPostLink.getAttribute('href')
    await firstPostLink.click()

    // Verify we landed on the blog post page
    await expect(page).toHaveURL(href!)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(postTitle!)
  })
})
