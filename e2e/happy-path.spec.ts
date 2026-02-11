import { test, expect } from '@playwright/test'

test.describe('happy path', () => {
  test.describe('homepage', () => {
    test('loads the homepage', async ({ page }) => {
      await page.goto('/')
      await expect(page).toHaveTitle(/Nick Nish/)
    })
  })

  test.describe('work page', () => {
    test('navigates to work and explores sections', async ({ page }) => {
      await page.goto('/work')

      // Verify sections exist
      await expect(page.getByTestId('WorkSection--about')).toContainText('About Me')
      await expect(page.getByTestId('WorkSection--career')).toContainText('Career')
      await expect(page.getByTestId('WorkSection--projects')).toContainText('Projects')

      // Navigate to a career item and back
      await page.getByTestId('WorkItem--/work/credit-karma').click()
      await expect(page.getByTestId('ShowHeader')).toContainText('Credit Karma')
      await page.getByTestId('ShowBackLink').click()
      await expect(page).toHaveURL('/work')

      // Navigate to a project and back
      await page.getByTestId('WorkItem--/projects/portfolio').click()
      await page.getByTestId('ShowBackLink').click()
      await expect(page).toHaveURL('/work')
    })
  })

  test.describe('navigation', () => {
    test('nav links navigate to correct pages', async ({ page }) => {
      await page.goto('/')

      // Navigate to start page
      await page.getByTestId('NavLink--/start').first().click()
      await expect(page).toHaveURL('/start')

      // Navigate to work page
      await page.getByTestId('NavLink--/work').first().click()
      await expect(page).toHaveURL('/work')

      // Navigate to lab page
      await page.getByTestId('NavLink--/lab').first().click()
      await expect(page).toHaveURL('/lab')
    })
  })
})
