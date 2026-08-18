import { test, expect } from '../fixtures/test-options';

// ------------------------------------------------------------
// Basic navigation and page checks
// ------------------------------------------------------------

test('check H1 heading', async ({ dysonManufacturerPage }) => {
  await expect(dysonManufacturerPage.h1Heading).toBeVisible();
  await expect(dysonManufacturerPage.h1Heading).toHaveText('Dyson');
});

// ------------------------------------------------------------
// UI element checks
// ------------------------------------------------------------

test('check Manufacturer button', async ({ dysonManufacturerPage }) => {
  await dysonManufacturerPage.assertManufacturerButton();
});

// ------------------------------------------------------------
// Tab and navigation checks
// ------------------------------------------------------------
test('check Manufacturer tabs', async ({ dysonManufacturerPage }) => {
  await dysonManufacturerPage.assertManufacturerTabs();
});

// ------------------------------------------------------------
// Phone link checks
// ------------------------------------------------------------
test('checks Dyson phone link details', async ({ dysonManufacturerPage }) => {
  await dysonManufacturerPage.assertPhoneLinkDetails();
});
// ------------------------------------------------------------
// Check manufcturer link is correct and opens in a new tab
// ------------------------------------------------------------
test('check Manufacturer link', async ({ dysonManufacturerPage }) => {
  await dysonManufacturerPage.assertManufacturerLink();
});
