const {test, expect} = require('@playwright/test');

test("Handle Multi-Select DropDown", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

/*
    // Select multiple options from the multi-select dropdown
    await page.selectOption('#colors', ['Blue', 'Red', 'Yellow']);

    // Assertions
    // 1 check number of options in the dropdown
    const multiSelectDropdown = page.locator('#colors');
    await multiSelectDropdown.locator('option').all();
    await expect(multiSelectDropdown.locator('option')).toHaveCount(7); // Expecting 7 options in the dropdown

    // 2 check number of options in the dropdown
    const options = await page.$$('#colors option');
    console.log("Number of options in the multi-select dropdown:", options.length);
    await expect(options.length).toBe(7); // Expecting 7 options in the dropdown
*/
    // 3 check presence of value in the dropdown options
    const multiSelectDropdown = await page.locator('#colors').textContent();
    await expect(multiSelectDropdown.includes('Red')).toBeTruthy(); // Expecting 'Red' to be present in the dropdown options
    await expect(multiSelectDropdown.includes('Purple')).toBeFalsy(); // Expecting 'Purple' to be absent in the dropdown options

    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the selection

});