const {test, expect} = require('@playwright/test');

test ('AssertionsTest', async ({page}) => {

    // open the page url
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts');

    // 1. Title assertion the page has correct url
    await expect(page).toHaveURL('https://playground.bondaracademy.com/pages/forms/layouts');

    // 2. Title assertion the page has correct title
    await expect(page).toHaveTitle('ui-playground-bondaracademy');

    // Helper to assert all buttons by locator and expected text
    async function assertAllButtons(locator, expectedText, label) {
        const count = await locator.count();
        console.log(`Number of ${label} buttons:`, count);
        for (let i = 0; i < count; i++) {
            const btn = locator.nth(i);
            await expect(btn).toBeVisible();
            await expect(btn).toHaveText(expectedText);
        }
    }

    // 3. Text assertion the element is visible and has correct text (non-problematic)
    await expect(page.locator('button:has-text("Submit")').nth(0)).toBeVisible();
    await expect(page.locator('button:has-text("Submit")').nth(0)).toHaveText('Submit');

    await expect(page.locator('button:has-text("Sign in")').nth(1)).toBeVisible();
    await expect(page.locator('button:has-text("Sign in")').nth(1)).toHaveText('Sign in');

    await expect(page.locator('button:has-text("Submit")').nth(2)).toBeVisible();
    await expect(page.locator('button:has-text("Submit")').nth(2)).toHaveText('Submit');

    // Problematic assertions only: use XPath locators as provided
    await assertAllButtons(page.locator("//button[normalize-space()='Send']"), 'Send', 'Send (XPath)');
    await assertAllButtons(page.locator("//button[@class='appearance-filled size-medium shape-rectangle status-danger nb-transition']"), 'Submit', 'Submit (danger, XPath)');
    await assertAllButtons(page.locator("//button[@class='appearance-filled size-medium shape-rectangle status-warning nb-transition']"), 'Sign in', 'Sign in (warning, XPath)');

});