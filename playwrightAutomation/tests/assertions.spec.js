const {test, expect} = require('@playwright/test');

test ('AssertionsTest', async ({page}) => {

    // open the page url
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts');

    // 1. Title assertion the page has correct url
    await expect(page).toHaveURL('https://playground.bondaracademy.com/pages/forms/layouts');

    // 2. Title assertion the page has correct title
    await expect(page).toHaveTitle('ui-playground-bondaracademy');

    // 3.1 Helper to assert all buttons by locator and expected text
    async function assertAllButtons(locator, expectedText, label) {
        const count = await locator.count();
        console.log(`Number of ${label} buttons:`, count);
        for (let i = 0; i < count; i++) {
            const btn = locator.nth(i);
            await expect(btn).toBeVisible();
            await expect(btn).toHaveText(expectedText);
        }
    }

    // 3.2 Text assertion the element is visible and has correct text (non-problematic)
    await expect(page.locator('button:has-text("Submit")').nth(0)).toBeVisible();
    await expect(page.locator('button:has-text("Submit")').nth(0)).toHaveText('Submit');

    await expect(page.locator('button:has-text("Sign in")').nth(1)).toBeVisible();
    await expect(page.locator('button:has-text("Sign in")').nth(1)).toHaveText('Sign in');

    await expect(page.locator('button:has-text("Submit")').nth(2)).toBeVisible();
    await expect(page.locator('button:has-text("Submit")').nth(2)).toHaveText('Submit');

    // 3.3 Problematic assertions only: use XPath locators as provided
    await assertAllButtons(page.locator("//button[normalize-space()='Send']"), 'Send', 'Send (XPath)');
    await assertAllButtons(page.locator("//button[@class='appearance-filled size-medium shape-rectangle status-danger nb-transition']"), 'Submit', 'Submit (danger, XPath)');
    await assertAllButtons(page.locator("//button[@class='appearance-filled size-medium shape-rectangle status-warning nb-transition']"), 'Sign in', 'Sign in (warning, XPath)');

    // 4. Check is enabled / is disabled
    const radioButtonOption1 = await page.locator("//span[normalize-space()='Option 1']");
    await expect(radioButtonOption1).toBeEnabled();

    const radioButtonOption2 = await page.locator("//span[normalize-space()='Option 2']");
    await expect(radioButtonOption2).toBeEnabled();

    const radioButtonDisabledOption = await page.locator("//span[normalize-space()='Disabled Option']");
    await expect(radioButtonDisabledOption).toBeDisabled();

    // 5. Check is checked / is not checked
    const rememberMeCheckbox = await page.locator("//form[@class='form-inline ng-untouched ng-pristine ng-valid']//span[@class='text'][normalize-space()='Remember me']");
    await rememberMeCheckbox.click();
    await expect(rememberMeCheckbox).toBeChecked();

    const checkMeOutCheckbox = await page.locator("//span[normalize-space()='Check me out']");
    await expect(checkMeOutCheckbox).not.toBeChecked();

    // 6. Check matches text elements
    await expect(await page.locator("//span[normalize-space()='Playground']")).toHaveText('Playground')

    // 7. Check contains text elements
    await expect(await page.locator("//span[normalize-space()='Playground']")).toContainText('Play')

    // 8. Input has a value
    const emailInput = await page.locator("//form[@class='form-inline ng-untouched ng-pristine ng-valid']//input[@placeholder='Email']")
    await emailInput.fill('admin@admin.com')
    await expect(emailInput).toHaveValue('admin@admin.com')

    // 9. List of elements has given length
    const options = await page.locator("//button[@type='button']")
    await expect(options).toHaveCount(1) // calculated only one element cuz other invizible in current state

});