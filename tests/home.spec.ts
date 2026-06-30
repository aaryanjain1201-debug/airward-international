import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Airward International/)
  })

  test('should display header with logo', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Airward').first()).toBeVisible()
    await expect(page.locator('text=INTERNATIONAL').first()).toBeVisible()
  })

  test('should display hero section with search bar', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Explore the World')).toBeVisible()
    await expect(page.locator('text=Best Deals')).toBeVisible()
    await expect(page.locator('input[placeholder*="Where do you want"]')).toBeVisible()
  })

  test('should display category cards', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Hotels').first()).toBeVisible()
    await expect(page.locator('text=Holidays').first()).toBeVisible()
    await expect(page.locator('text=Visa').first()).toBeVisible()
  })

  test('should display featured packages', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Featured Packages')).toBeVisible()
    await expect(page.locator('text=Magical Maldives Paradise')).toBeVisible()
    await expect(page.locator('text=Swiss Alps Adventure')).toBeVisible()
    await expect(page.locator('text=Dubai Luxury Escape')).toBeVisible()
  })

  test('should display deals section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Deals & Offers')).toBeVisible()
    await expect(page.locator('text=Early Bird Offer')).toBeVisible()
    await expect(page.locator('text=Group Discount')).toBeVisible()
    await expect(page.locator('text=Honeymoon Special')).toBeVisible()
  })

  test('should display footer with contact info', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=info@airwardinternational.com').first()).toBeVisible()
    await expect(page.locator('text=Ahmedabad').first()).toBeVisible()
    await expect(page.locator('text=88664 01355').first()).toBeVisible()
  })

  test('should display trust badges', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Best Prices').first()).toBeVisible()
    await expect(page.locator('text=Secure Booking').first()).toBeVisible()
    await expect(page.locator('text=24/7 Support').first()).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('should navigate to packages page via header', async ({ page }) => {
    await page.goto('/')
    await page.click('nav >> text=Packages')
    await expect(page).toHaveURL(/.*packages/)
    await expect(page.locator('text=Explore Packages')).toBeVisible()
  })

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/login"]')
    await expect(page).toHaveURL(/.*login/)
    await expect(page.locator('text=Welcome Back')).toBeVisible()
  })

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Sign Up')
    await expect(page).toHaveURL(/.*signup/)
    await expect(page.locator('h1:has-text("Create Account")')).toBeVisible()
  })

  test('should navigate via footer links', async ({ page }) => {
    await page.goto('/')
    await page.click('footer >> text=About Us')
    await expect(page).toHaveURL(/.*about/)
    await expect(page.locator('text=About Airward International')).toBeVisible()
  })

  test('should navigate to contact via footer', async ({ page }) => {
    await page.goto('/')
    await page.click('footer >> text=Contact Us')
    await expect(page).toHaveURL(/.*contact/)
    await expect(page.locator('h1:has-text("Contact Us")')).toBeVisible()
  })
})
