import { test, expect } from '@playwright/test';

test('navigate to Dyson home page', async ({ page }) => {
  await page.goto('https://source.thenbs.com/en/gb');
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('dyson');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  await page.getByRole('tab', { name: 'Manufacturers' }).click();
  await page.getByRole('link', { name: 'Dyson Dyson Technology for' }).click();
});

test('check H1 heading', async ({ page }) => {
  await page.goto('https://source.thenbs.com/en/gb');
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('dyson');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  await page.getByRole('tab', { name: 'Manufacturers' }).click();
  await page.getByRole('link', { name: 'Dyson Dyson Technology for' }).click();
  await expect(page).toHaveURL(/dyson/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dys0n');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});