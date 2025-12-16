const {test, expect} = require('@playwright/test')

test("Handle Input Box", async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/pages/forms/layouts");

    // Locate the input box using XPath and type text into it
    await expect(await page.locator("//input[@placeholder='Jane Doe']")).toBeVisible();
    await expect(await page.locator("//input[@placeholder='Jane Doe']")).toBeEmpty();
    await expect(await page.locator("//input[@placeholder='Jane Doe']")).toBeEditable();
    await expect(await page.locator("//input[@placeholder='Jane Doe']")).toBeEnabled();

    const inputBox = page.locator("//input[@placeholder='Jane Doe']");
    await inputBox.fill("John Smith");

    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the input

})