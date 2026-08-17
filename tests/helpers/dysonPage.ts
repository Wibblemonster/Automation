// tests/helpers/dysonPage.ts
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export async function openDysonManufacturerPage(page: Page) {
  const dysonManufacturerUrl =
    'https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview';

  await page.goto(dysonManufacturerUrl);
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(dysonManufacturerUrl);
}
