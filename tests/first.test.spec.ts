import { test, expect } from '../fixtures/test-options';
import { openDysonManufacturerPage } from './helpers/dysonPage';
import { DysonManufacturerPage } from '../pages/DysonManufacturerPage';

test.beforeEach(async ({ page }) => {
  await openDysonManufacturerPage(page);
});

// ------------------------------------------------------------
// Basic navigation and page checks
// ------------------------------------------------------------

test('check H1 heading', async ({ page }) => {
  const dysonManufacturerPage = new DysonManufacturerPage(page);
  await expect(dysonManufacturerPage.h1Heading).toBeVisible();
  await expect(dysonManufacturerPage.h1Heading).toHaveText('Dyson');
});

// ------------------------------------------------------------
// UI element checks
// ------------------------------------------------------------

test('check Manufacturer button', async ({ page }) => {
  const dysonManufacturerPage = new DysonManufacturerPage(page);
  await dysonManufacturerPage.assertManufacturerButton();
});

// ------------------------------------------------------------
// Tab and navigation checks
// ------------------------------------------------------------
test('check Manufacturer tabs', async ({ page }) => {
  const dysonManufacturerPage = new DysonManufacturerPage(page);
  await dysonManufacturerPage.assertManufacturerTabs();
});

// ------------------------------------------------------------
// Phone link checks
// ------------------------------------------------------------
test('checks Dyson phone link details', async ({ page }) => {
  const dysonManufacturerPage = new DysonManufacturerPage(page);
  await dysonManufacturerPage.assertPhoneLinkDetails();
});
