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
  await expect(dysonManufacturerPage.manufacturerButton).toBeVisible();
  await expect(dysonManufacturerPage.navBar).toContainText("I'm a manufacturer");
  await expect(dysonManufacturerPage.manufacturerButton).toHaveAttribute(
    'href',
    dysonManufacturerPage.urlManufacturer
  );
});

// ------------------------------------------------------------
// Tab and navigation checks
// ------------------------------------------------------------
test('check Manufacturer tabs', async ({ dysonManufacturerPage }) => {
  const { tabs } = dysonManufacturerPage;

  await expect(tabs).toHaveCount(expectedTabs.length);
  await expect(tabs).toHaveText(expectedTabs.map(tab => tab.name));

  for (const [index, expected] of expectedTabs.entries()) {
    const tab = tabs.nth(index);

    await expect(tab).toBeVisible();
    await expect(tab).toHaveAttribute('data-cy', expected.dataCy);
    await expect(tab).toHaveAttribute('href', expected.href);
  }
});

// ------------------------------------------------------------
// Phone link checks
// ------------------------------------------------------------
test('checks Dyson phone link details', async ({ dysonManufacturerPage }) => {
  await dysonManufacturerPage.assertPhoneLinkDetails();
});

// ------------------------------------------------------------
// Check LinkedIn link is correct and opens in a new tab
// ------------------------------------------------------------
test('check LinkedIn link', async ({ dysonManufacturerPage }) => {
  await dysonManufacturerPage.assertLinkedInLink();
});

// ------------------------------------------------------------
// Scroll to top button checks
// ------------------------------------------------------------

test('check Scroll to top button', async ({ dysonManufacturerPage }) => {
  await dysonManufacturerPage.assertScrollToTopButton();
});

// ------------------------------------------------------------
// User login checks
// ------------------------------------------------------------

test('User Login', async ({ signInPage }) => {
  await signInPage.login();
});
