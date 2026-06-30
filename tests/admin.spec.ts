import { test, expect } from '@playwright/test'

test.describe('Admin Dashboard', () => {
  test('should load admin page', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.locator('text=Admin Panel')).toBeVisible()
  })

  test('should display sidebar navigation', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.locator('button:has-text("Dashboard")')).toBeVisible()
    await expect(page.locator('button:has-text("Packages")')).toBeVisible()
    await expect(page.locator('button:has-text("Bookings")')).toBeVisible()
    await expect(page.locator('button:has-text("Settings")')).toBeVisible()
  })

  test('should navigate to packages management', async ({ page }) => {
    await page.goto('/admin')
    await page.click('button:has-text("Packages")')
    await expect(page.locator('text=Manage Packages')).toBeVisible()
  })

  test('should navigate to bookings tab', async ({ page }) => {
    await page.goto('/admin')
    await page.click('button:has-text("Bookings")')
    await expect(page.locator('text=All Bookings')).toBeVisible()
  })

  test('should navigate to settings tab', async ({ page }) => {
    await page.goto('/admin')
    await page.click('button:has-text("Settings")')
    await expect(page.locator('text=Website Name')).toBeVisible()
  })
})