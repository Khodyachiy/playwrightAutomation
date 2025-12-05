const { test, expect } = require('@playwright/test');

test('Home Page', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
    const pageTitle = page.title();
    console.log('Page title is:', pageTitle);

    // Update the expected title to match the actual value
    await expect(page).toHaveTitle('ui-playground-bondaracademy');

    const pageURL = page.url();
    console.log('Page URL is:', pageURL);

    await expect(page).toHaveURL('https://playground.bondaracademy.com/pages/iot-dashboard');

    await page.close();
});
