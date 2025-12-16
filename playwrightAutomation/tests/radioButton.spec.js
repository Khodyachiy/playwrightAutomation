const {test, expect} = require('@playwright/test')

test("Handle Radio Button", async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/pages/forms/layouts");

    // Helper to assert input box state for Using the Grid section
    async function assertInputBox(locator) {
        await expect(locator).toBeVisible();
        await expect(locator).toBeEmpty();
        await expect(locator).toBeEditable();
        await expect(locator).toBeEnabled();
    }

    const inputEmail = page.locator("#inputEmail1");
    await assertInputBox(inputEmail);
    await inputEmail.fill("admin@admin.com");

    const inputPassword = page.locator("#inputPassword2");
    await assertInputBox(inputPassword);
    await inputPassword.fill("admin");

    // Helper to assert radio button state
    await page.locator("//span[normalize-space()='Option 1']").click();
    await expect(await page.locator("//span[normalize-space()='Option 1']")).toBeChecked();
    await expect(await page.locator("//span[normalize-space()='Option 1']").isChecked()).toBeTruthy(); // Option 1 is checked

    await expect(await page.locator("//span[normalize-space()='Option 2']").isChecked()).toBeFalsy(); // Option 2 is not checked

    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the input

})