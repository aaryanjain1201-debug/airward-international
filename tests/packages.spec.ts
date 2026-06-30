import { test, expect } from '@playwright/test'

test.describe('Packages Page', () => {
  test('should load packages page', async ({ page }) => {
    await page.goto('/packages')
    await expect(page.locator('text=Explore Packages')).toBeVisible()
  })

  test('should display package cards', async ({ page }) => {
    await page.goto('/packages')
    await expect(page.locator('text=Magical Maldives Paradise')).toBeVisible()
    await expect(page.locator('text=Swiss Alps Adventure')).toBeVisible()
    await expect(page.locator('text=Dubai Luxury Escape')).toBeVisible()
    await expect(page.locator('text=Bali Cultural Retreat')).toBeVisible()
    await expect(page.locator('text=Paris Romantic Getaway')).toBeVisible()
    await expect(page.locator('text=Thailand Island Hopping')).toBeVisible()
  })

  test('should filter packages by category', async ({ page }) => {
    await page.goto('/packages')
    await page.click('button:has-text("Beach")')
    await expect(page.locator('text=Magical Maldives Paradise')).toBeVisible()
    await expect(page.locator('text=Thailand Island Hopping')).toBeVisible()
    await expect(page.locator('text=Swiss Alps Adventure')).not.toBeVisible()
  })

  test('should search packages', async ({ page }) => {
    await page.goto('/packages')
    await page.fill('input[placeholder*="Search destinations"]', 'Dubai')
    await expect(page.locator('text=Dubai Luxury Escape')).toBeVisible()
    await expect(page.locator('text=Magical Maldives Paradise')).not.toBeVisible()
  })

  test('should show package prices', async ({ page }) => {
    await page.goto('/packages')
    await expect(page.locator('text=₹89,999').first()).toBeVisible()
    await expect(page.locator('text=₹69,999').first()).toBeVisible()
  })

  test('should display book buttons', async ({ page }) => {
    await page.goto('/packages')
    const bookButtons = page.locator('a:has-text("Book")')
    await expect(bookButtons.first()).toBeVisible()
  })
})

test.describe('Package Detail Page', () => {
  test('should load package detail', async ({ page }) => {
    await page.goto('/packages/1')
    await expect(page.locator('text=Magical Maldives Paradise')).toBeVisible()
  })

  test('should display package info', async ({ page }) => {
    await page.goto('/packages/1')
    await expect(page.locator('text=Maldives').first()).toBeVisible()
    await expect(page.locator('text=5 Days').first()).toBeVisible()
    await expect(page.locator('text=₹89,999').first()).toBeVisible()
  })

  test('should display itinerary tab', async ({ page }) => {
    await page.goto('/packages/1')
    await expect(page.locator('text=itinerary').first()).toBeVisible()
    await expect(page.locator('text=Arrival & Transfer')).toBeVisible()
  })

  test('should display inclusions tab', async ({ page }) => {
    await page.goto('/packages/1')
    await page.click('button:has-text("inclusions")')
    await expect(page.locator('text=Included').first()).toBeVisible()
    await expect(page.locator('text=Flights')).toBeVisible()
  })

  test('should display highlights tab', async ({ page }) => {
    await page.goto('/packages/1')
    await page.click('button:has-text("highlights")')
    await expect(page.locator('span:has-text("Overwater Villa")').first()).toBeVisible()
    await expect(page.locator('span:has-text("Snorkeling")').first()).toBeVisible()
  })

  test('should display booking sidebar', async ({ page }) => {
    await page.goto('/packages/1')
    await expect(page.locator('text=Proceed to Book')).toBeVisible()
    await expect(page.locator('text=Travel Date').first()).toBeVisible()
  })

  test('should display back to packages link', async ({ page }) => {
    await page.goto('/packages/1')
    await expect(page.locator('a:has-text("Back to Packages")')).toBeVisible()
  })
})
