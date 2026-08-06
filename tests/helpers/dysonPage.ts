// tests/helpers/dysonPage.ts
import type { Page } from '@playwright/test';

export async function openDysonManufacturerPage(page: Page) {
  await page.goto('https://source.thenbs.com/en/gb');

  try {
    await page.getByRole('button', { name: 'Close dialog' }).click({ timeout: 3000 });
  } catch {
    console.log('No dialog to close, continuing with the test.');
  }

  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('dyson');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  await page.getByRole('tab', { name: 'Manufacturers' }).click();
  await page.getByRole('link', { name: 'Dyson Dyson Technology for' }).click();
}