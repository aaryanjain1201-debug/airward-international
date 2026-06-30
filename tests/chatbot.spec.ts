import { test, expect } from '@playwright/test'

test.describe('ChatBot', () => {
  test('should display chat button', async ({ page }) => {
    await page.goto('/')
    const chatBtn = page.locator('.fixed.bottom-6.right-6')
    await expect(chatBtn).toBeVisible()
  })

  test('should open chat window on click', async ({ page }) => {
    await page.goto('/')
    const chatBtn = page.locator('.fixed.bottom-6.right-6')
    await chatBtn.click()
    await expect(page.locator('text=Airward Assistant')).toBeVisible()
    await expect(page.locator('text=Online')).toBeVisible()
  })

  test('should display welcome message', async ({ page }) => {
    await page.goto('/')
    const chatBtn = page.locator('.fixed.bottom-6.right-6')
    await chatBtn.click()
    await expect(page.locator('text=Welcome to Airward International')).toBeVisible()
  })

  test('should display suggestion buttons', async ({ page }) => {
    await page.goto('/')
    const chatBtn = page.locator('.fixed.bottom-6.right-6')
    await chatBtn.click()
    await expect(page.locator('button:has-text("Show me packages")')).toBeVisible()
    await expect(page.locator('button:has-text("Best deals")')).toBeVisible()
    await expect(page.locator('button:has-text("Contact support")')).toBeVisible()
  })

  test('should respond to "packages" query', async ({ page }) => {
    await page.goto('/')
    const chatBtn = page.locator('.fixed.bottom-6.right-6')
    await chatBtn.click()
    await page.fill('input[placeholder="Type a message..."]', 'packages')
    await page.press('input[placeholder="Type a message..."]', 'Enter')
    await expect(page.locator('text=Maldives').first()).toBeVisible()
  })

  test('should respond to "discount" query', async ({ page }) => {
    await page.goto('/')
    const chatBtn = page.locator('.fixed.bottom-6.right-6')
    await chatBtn.click()
    await page.fill('input[placeholder="Type a message..."]', 'discount')
    await page.press('input[placeholder="Type a message..."]', 'Enter')
    await expect(page.locator('text=Early Bird').first()).toBeVisible()
  })

  test('should respond to founder query', async ({ page }) => {
    await page.goto('/')
    const chatBtn = page.locator('.fixed.bottom-6.right-6')
    await chatBtn.click()
    await page.fill('input[placeholder="Type a message..."]', 'founder')
    await page.press('input[placeholder="Type a message..."]', 'Enter')
    await expect(page.locator('text=Arihant Jain').first()).toBeVisible()
  })
})
