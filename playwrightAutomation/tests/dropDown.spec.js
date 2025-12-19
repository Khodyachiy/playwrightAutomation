const {test, expect} = require('@playwright/test')

test("Handle DropDown", async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/pages/modal-overlays/toastr");

    /*
    // 0. Alternative robust way to select the Toast type dropdown option
    const toastTypeDropDown = page.locator('select');
    await toastTypeDropDown.waitFor('visible');
    await toastTypeDropDown.selectOption('info');
    await expect(toastTypeDropDown).toHaveValue('info');
    
    // 1. Select the Toast type dropdown option robustly using value
    const toastTypeDropDown = page.locator('select');
    await toastTypeDropDown.waitFor({ state: 'visible' });
    await toastTypeDropDown.selectOption({ value: 'success' });
    await expect(toastTypeDropDown).toHaveValue('success');
    
    // 2. Alternative robust way to select the Toast type dropdown option using label
    const toastTypeDropDown = page.locator('select');
    await toastTypeDropDown.waitFor({ state: 'visible' });
    await toastTypeDropDown.selectOption({ label: 'danger' });
    await expect(toastTypeDropDown).toHaveValue('danger');
    
    // 3. Select the Toast type dropdown option using index
    const toastTypeDropDown = page.locator('select');
    await toastTypeDropDown.waitFor({ state: 'visible' });
    await toastTypeDropDown.selectOption({ index: 3 });
    await expect(toastTypeDropDown).toHaveValue('warning');

    // 4. Select the Toast type dropdown option using direct string value
    await page.locator('select').waitFor({ state: 'visible' });
    await page.selectOption('select', 'info');
    await expect(page.locator('select')).toHaveValue('info');
    */

    // Assertions and interactions with dropdown options
    /*
    // 1. Check number of options in the dropdown
    const toastTypeDropDown = page.locator('select');
    await toastTypeDropDown.locator('option').all();
    await expect(toastTypeDropDown.locator('option')).toHaveCount(5); // Expecting 5 options in the dropdown

    // 2. Count options in the dropdown
    const options = await page.$$('option');
    console.log("Number of options in the dropdown:", options.length);
    await expect(options.length).toBe(5); // Expecting 5 options in the dropdown

    // 3. Check only the first option's text for 'primary'
    const firstOptionText = await page.locator('select > option').first().textContent();
    expect(firstOptionText).toBe('primary'); // Expecting the first option to be 'primary'

    // 4. Efficiently check for the 'info' option by value, regardless of position
    const infoOption = page.locator('select > option[value="info"]');
    await expect(infoOption).toHaveText('info');

    // 5. Show all dropdown options as text - using a loop
    const allOptions = page.locator('select > option');
    const optionCount = await allOptions.count();
    console.log("Dropdown options:");
    
    for (let i = 0; i < optionCount; i++) {
        const optionText = await allOptions.nth(i).textContent();
        console.log(optionText.trim());
    }

    // 6. Select a specific value from dropdown options as text - using a loop
    const specificOption = await page.$$('select > option');
    let status = false;
    for (const option of specificOption) {
        let value = await option.textContent();
        if (value.includes('warning')) {
            status = true;
            const optionValue = await option.getAttribute('value'); // Get the value attribute of the option
            await page.selectOption('select', optionValue); // Select the option by its value
            break;
        }
    }
    expect(status).toBeTruthy(); // Expecting to find and select the 'warning' option
    */
    // 7. Final robust selection of dropdown option using loop and value
    const dropdownOptions = await page.$$('select > option');
    for (const option of dropdownOptions) {
        const optionText = await option.textContent();
        if (optionText.trim() === 'warning') {
            const optionValue = await option.getAttribute('value');
            await page.selectOption('select', optionValue); // Select the option by its value
            break;
        }
    }

    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the input
});