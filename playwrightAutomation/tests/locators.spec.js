import {test, expect} from '@playwright/test';

test('Locators', async ({page}) => {

    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');

    // Click on Authentication icon and Login button - XPath selectors
    await page.click("//a[@title='Auth']");
    await page.click("//a[@title='Login']");

    // Fill in username and password CSS selectors
    await page.fill('#input-email', 'admin@admin.com');
    await page.fill('#input-password', 'admin');

    // Verify that the Login button is visible - XPath selector
    const loginButton = page.locator("//button[normalize-space()='Log In']");
    await expect(loginButton).toBeVisible();

    // Click on Login button - XPath selector
    await page.click("//button[normalize-space()='Log In']");

    // Close the page
    await page.close();
});