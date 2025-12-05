import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://allo.ua/ua/dnipro/products/internet-planshety/proizvoditel-apple/');

  // Click on the Samsung image (using XPath locator)
  await page.locator("//img[@alt='Samsung']").click();

  // Click on the specific Samsung tablet image in the active slider
  await page.locator("//div[@class='snap-slider__item active']//img[@title='Планшет Samsung Galaxy Tab A11 WF 128GB (SM-X130NZAEEUC) Gray']").click();

  // Click the 'Купити' button by role and name
  await page.getByRole('button', { name: 'Купити' }).click();

  // Close the modal (if present)
  await page.locator('.vi.i-shared.vi__close').click();
});