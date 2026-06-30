import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test('should load about page', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=About Airward International')).toBeVisible()
  })

  test('should display founders info', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=Arihant Jain').first()).toBeVisible()
    await expect(page.locator('text=Shweta Jain').first()).toBeVisible()
  })

  test('should display office location', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=Ahmedabad').first()).toBeVisible()
  })

  test('should display stats', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=50+').first()).toBeVisible()
    await expect(page.locator('text=10K+').first()).toBeVisible()
  })

  test('should display values section', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=Our Values')).toBeVisible()
    await expect(page.locator('text=Global Reach')).toBeVisible()
    await expect(page.locator('text=Best Prices')).toBeVisible()
  })

  test('should have CTA button', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('a:has-text("Explore Packages")')).toBeVisible()
  })
})

test.describe('Contact Page', () => {
  test('should load contact page', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('h1:has-text("Contact Us")')).toBeVisible()
  })

  test('should display contact info', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('text=info@airwardinternational.com').first()).toBeVisible()
    await expect(page.locator('text=88664 01355').first()).toBeVisible()
    await expect(page.locator('text=Ahmedabad').first()).toBeVisible()
  })

  test('should display contact form', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('text=Send Message')).toBeVisible()
    await expect(page.locator('input[placeholder*="Your name"]')).toBeVisible()
    await expect(page.locator('input[placeholder*="email"]')).toBeVisible()
  })

  test('should submit contact form', async ({ page }) => {
    await page.goto('/contact')
    await page.fill('input[placeholder*="Your name"]', 'Test User')
    await page.fill('input[placeholder*="email"]', 'test@test.com')
    await page.fill('input[placeholder*="How can we help"]', 'Test Subject')
    await page.fill('textarea', 'Test message content')
    await page.click('button:has-text("Send Message")')
    await expect(page.locator('text=Message Sent!')).toBeVisible()
  })
})

test.describe('Login Page', () => {
  test('should load login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('text=Welcome Back')).toBeVisible()
  })

  test('should display login form', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible()
  })

  test('should have signup link', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('main >> text=Sign Up')).toBeVisible()
  })
})

test.describe('Signup Page', () => {
  test('should load signup page', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.locator('h1:has-text("Create Account")')).toBeVisible()
  })

  test('should display signup form', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.locator('input[placeholder*="John"]')).toBeVisible()
    await expect(page.locator('input[placeholder*="email"]')).toBeVisible()
    await expect(page.locator('input[placeholder*="88664"]')).toBeVisible()
    await expect(page.locator('button:has-text("Create Account")')).toBeVisible()
  })

  test('should have login link', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.locator('main >> text=Sign In')).toBeVisible()
  })
})