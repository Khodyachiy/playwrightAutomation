const {test, expect} = require('@playwright/test')

test("Handle DropDown", async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/pages/modal-overlays/toastr");

    // Click on the dropdown to reveal options
    await page.locator("//nb-select[@class='position-select appearance-outline size-medium status-basic shape-rectangle nb-transition']//nb-icon[@icon='chevron-down-outline']//*[name()='svg']//*[name()='g' and contains(@data-name,'Layer 2')]//*[name()='g' and contains(@data-name,'chevron-do')]//*[name()='rect' and contains(@width,'24')]").click();

    // Wait for the overlay and options to be visible
    await page.waitForSelector("//div[contains(@class,'cdk-overlay-pane')]//nb-option", { state: 'visible' });

    // Select the 'top-end' option from the dropdown
    const dropdownOptions = await page.$$("//div[contains(@class,'cdk-overlay-pane')]//nb-option");
    for (const option of dropdownOptions) {
        const optionText = await option.textContent();
        //console.log(optionText?.trim()); // Get all visible nb-option elements
        if (optionText?.includes('top-end')) {
            await option.click();
            break
        }
    }

    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the input
});