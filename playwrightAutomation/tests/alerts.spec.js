import { test, expect } from '@playwright/test';

test.skip('Alert with OK', async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/pages/modal-overlays/dialog');

    // Enabling Dialog window handler
    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('open dialog with template'));
        expect(dialog.message()).toBe('this is some additional data passed to dialog');
        await dialog.accept();
    });

    await page.click("//button[normalize-space()='Open Dialog with template']");
    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the alert handling
    
});

test.skip('Confirmation Dialog Alert with Ok and Cancel', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

    // Enabling Dialog window handler
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('Press a button!');
        //await dialog.accept(); // To click 'OK' button
        await dialog.dismiss(); // To click 'Cancel' button
    });

    await page.click("//button[@id='confirmBtn']");
    //await expect(await page.locator("//p[@id='demo']")).toHaveText('You pressed OK!'); // if used accept()
    await expect(await page.locator("//p[@id='demo']")).toHaveText('You pressed Cancel!'); // if used dismiss()
    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the alert handling
  
});

test.skip('Prompt Dialog', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

    // Enabling Dialog window handler
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('Please enter your name:')
        expect(dialog.defaultValue()).toContain('Harry Potter');
        await dialog.accept('Jones'); // Input text and click 'OK' button
    });

    await page.click("//button[@id='promptBtn']");
    await expect(await page.locator("//p[@id='demo']")).toHaveText('Hello Jones! How are you today?'); // Verifying the input text is reflected
    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the alert handling
  
});

test('Prompt Dialog with random pop-up', async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/pages/modal-overlays/dialog');

  // Enabling dialog window handler with random pop-up
  await page.addLocatorHandler(page.getByText('Friendly reminder'), async () => {
    await page.getByRole('button', { name: 'OK' }).click();
  })

  await page.getByRole('button', {name: 'Enter Name'}).click();
  await page.getByRole('textbox').fill('Nick Jones')
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(await page.locator("//li[@class='ng-star-inserted']")).toHaveText('Nick Jones');
  await page.waitForTimeout(2000); // Wait for 2 seconds to observe the alert handling

});