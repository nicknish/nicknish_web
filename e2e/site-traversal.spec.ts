import { test, expect } from '@playwright/test'

test.describe('site traversal', () => {
  test('every URL in the sitemap loads successfully', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)

    const urls = await page.evaluate(() => {
      const locs = document.querySelectorAll('loc')
      return Array.from(locs).map((el) => el.textContent ?? '')
    })

    expect(urls.length).toBeGreaterThan(0)

    for (const url of urls) {
      const res = await page.goto(url)
      expect(res?.status(), `Expected 200 for ${url}`).toBe(200)
    }
  })
})
