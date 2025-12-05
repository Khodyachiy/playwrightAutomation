const { test, expect } = require('@playwright/test');

test('Locating Multiple Elements', async ({ page }) => {
    
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');

    // Calculate the number of links on the page
    const numbers = page.locator('a');
    const count = await numbers.count();
    console.log(`Total number of links on the page: ${count}`);

    // Print the text of each link on the page
    const links = await page.$$('a');
    for (const link of links) {
        const linkText = await link.textContent();
        console.log(linkText);
    };

    // Navigate to the registration form and print all label texts
    await page.click("//a[@title='Auth']");
    await page.click("//a[@title='Register']");

    const registrationForm = await page.$("//form[@class='ng-untouched ng-pristine ng-invalid']");
    if (registrationForm) {
        const labels = await registrationForm.$$('label');
        for (const label of labels) {
            const labelText = await label.textContent();
            console.log(labelText?.trim());
        }
    }

    // Close the page
    await page.close();
});