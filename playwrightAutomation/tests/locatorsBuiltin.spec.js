/*
These are the recommended built-in locators.

page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/

const { test, expect } = require('@playwright/test');

test('Built in Locators', async ({ page }) => {

    await page.goto('https://playground.bondaracademy.com/auth/register');
/*  
    // Example of using getByAltText to locate an image by its alt text
    const logo = await page.getByAltText('Register');
    await expect(logo).toBeVisible();
*/
    // Select the custom checkbox using XPath since it lacks proper attributes
    await page.click("//span[@class='custom-checkbox']");

    // Fill out the registration form
    await page.getByPlaceholder('Full name').fill('Admin Admin');
    await page.getByPlaceholder('Email address').fill('admin@admin.com');
    await page.getByPlaceholder('Password').nth(0).fill('P@ssword'); // Password
    await page.getByPlaceholder('Password').nth(1).fill('P@ssword'); // Confirm Password
    await page.getByRole('button', { name: 'Register' }).click();

    // Verify the error message
    const emailError = await page.getByText('Oh snap!');
    await expect(emailError).toBeVisible();

    // Close the page
    await page.close();
});