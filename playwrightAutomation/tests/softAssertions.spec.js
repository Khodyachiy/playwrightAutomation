const {test, expect} = require('@playwright/test')

test("Soft Assertions", async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/pages/forms/layouts")
/*
    // Hard Assertions
    await expect(page).toHaveTitle('ui-playground-bondaracademy');
    await expect(page).toHaveURL('https://playground.bondaracademy.com/pages/forms/layouts');
    await expect(await page.locator("//span[normalize-space()='Playground']")).toHaveText('Playground');
*/
    // Soft Assertions
    await expect.soft(page).toHaveTitle('ui');
    await expect.soft(page).toHaveURL('https://playground.bondaracademy.com/pages/forms/layouts');
    await expect.soft(await page.locator("//span[normalize-space()='Playground']")).toHaveText('Playground');

});