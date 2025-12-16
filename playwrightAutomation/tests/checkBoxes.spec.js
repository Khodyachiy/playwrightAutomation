/*

Specific locators for Basic form section:
//nb-card-header[normalize-space()='Basic form']/following::input[@id='exampleInputEmail1' and @placeholder='Email'][1]
//nb-card-header[normalize-space()='Basic form']/following::input[@id='exampleInputPassword1' and @placeholder='Password'][1]
//nb-card-header[normalize-space()='Basic form']/following::span[contains(@class,'custom-checkbox')][1]

*/

const {test, expect} = require('@playwright/test')

test("Handle Checkboxes", async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/pages/forms/layouts");

        // Helper to assert input box state for Using the Basic form section
    async function assertInputBox(locator) {
        await expect(locator).toBeVisible();
        await expect(locator).toBeEmpty();
        await expect(locator).toBeEditable();
        await expect(locator).toBeEnabled();
    }

    const inputEmail = page.locator("//nb-card-header[normalize-space()='Basic form']/following::input[@id='exampleInputEmail1' and @placeholder='Email']");
    await assertInputBox(inputEmail);
    await inputEmail.fill("admin@admin.com");

    const inputPassword = page.locator("//nb-card-header[normalize-space()='Basic form']/following::input[@id='exampleInputPassword1' and @placeholder='Password']");
    await assertInputBox(inputPassword);
    await inputPassword.fill("admin");

        // Helper to assert Checkbox state
    const customCheckbox = page.locator("//nb-card-header[normalize-space()='Basic form']/following::span[contains(@class,'custom-checkbox')][1]");
    await customCheckbox.check();
    await expect(customCheckbox).toBeChecked();
    expect(await customCheckbox.isChecked()).toBeTruthy(); // Checkbox is checked

    await customCheckbox.uncheck();
    await expect(customCheckbox).not.toBeChecked();
    expect(await customCheckbox.isChecked()).toBeFalsy(); // Checkbox is not checked 

        // Select Multiple checkboxes
    const multiCheckboxes = [
        "//nb-card-header[normalize-space()='Basic form']/following::span[contains(@class,'custom-checkbox')][1]",
        "//form[@class='form-inline ng-untouched ng-pristine ng-valid']//span[@class='text'][normalize-space()='Remember me']",
        "//div[@class='checkbox']//span[@class='text'][normalize-space()='Remember me']"
        ];

    for (const checkboxLocator of multiCheckboxes) {
        const checkbox = page.locator(checkboxLocator);
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        expect(await checkbox.isChecked()).toBeTruthy(); // Checkboxes are checked
    }

    for (const checkboxLocator of multiCheckboxes) {
        if (await page.locator(checkboxLocator).isChecked()) 
            {
                await page.locator(checkboxLocator).uncheck();
            } 
        expect(await page.locator(checkboxLocator).isChecked()).toBeFalsy(); // Checkboxes are not checked 
    }


    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the input

});
