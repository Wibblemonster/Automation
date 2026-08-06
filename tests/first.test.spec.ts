import { test, expect, type Locator, type Page } from '@playwright/test';
import { openDysonManufacturerPage } from './helpers/dysonPage';


// Shared locator used across the phone-link related tests.
let phoneLink: Locator;

// Create a locator for the Dyson phone link on the current page.
const getPhoneLink = (page: Page) => page.locator('a[title="Call 08003457788"]');

// Run before each test so the locator is always tied to the current page.
test.beforeEach(async ({ page }) => {
  phoneLink = getPhoneLink(page);
});

test.beforeEach(async ({ page }) => {
  await openDysonManufacturerPage(page);
});



// ------------------------------------------------------------
// Basic navigation and page checks
// ------------------------------------------------------------
test('navigate to Dyson home page', async ({ page }) => {
    await expect(page).toHaveURL('https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
});

test('check H1 heading', async ({ page }) => {
  await expect(page).toHaveURL('https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dyson');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

// ------------------------------------------------------------
// UI element checks
// ------------------------------------------------------------
test('check Manufacturer button', async ({ page }) => {
  await expect(page).toHaveURL('https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
  await expect(page.getByRole('link', { name: 'I\'m a manufacturer' })).toBeVisible();
  await expect(page.locator('app-secondary-navbar')).toContainText('I\'m a manufacturer'); 
  await expect(page.getByRole('link', { name: 'I\'m a manufacturer' })).toHaveAttribute('href', 'https://manufacturers.thenbs.com/nbs-source');
});

// ------------------------------------------------------------
// Tab and navigation checks
// ------------------------------------------------------------
test('checks manufacturer tabs', async ({ page }) => {
  
  const expectedTabs = [
    { name: 'Overview', dataCy: 'overviewTab', href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview' },
    { name: 'Products', dataCy: 'productsTab', href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/products' },
    { name: 'Certifications', dataCy: 'certificatesTab', href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/third-party-certifications' },
    { name: 'Literature', dataCy: 'literatureTab', href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/literature' },
    { name: 'Case studies', dataCy: 'caseStudiesTab', href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/case-studies' },
    { name: 'About us', dataCy: 'aboutTab', href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/about' },
  ];

  const tabLinks = page.locator('div.mat-mdc-tab-list a[mat-tab-link]');

  await expect(tabLinks).toHaveCount(expectedTabs.length);

  for (const [index, expected] of expectedTabs.entries()) {
    const link = tabLinks.nth(index);

    await expect(link).toBeVisible();
    await expect(link).toContainText(expected.name);
    await expect(link).toHaveAttribute('data-cy', expected.dataCy);
    await expect(link).toHaveAttribute('href', expected.href);
  }

  const actualLabels = await tabLinks.evaluateAll((els) =>
    els.map((el) => el.textContent?.trim() ?? '')
  );

  expect(actualLabels).toEqual(expectedTabs.map((tab) => tab.name));
});

// ------------------------------------------------------------
// Phone link checks
// ------------------------------------------------------------
test('checks Dyson phone link details', async ({ page }) => {
 
  await expect(phoneLink).toBeVisible();
  await expect(phoneLink).toContainText('08003457788');
  await expect(phoneLink).toHaveAttribute('title', 'Call 08003457788');
  await expect(phoneLink).toHaveAttribute('href', 'tel:08003457788');
});

// ------------------------------------------------------------
// Extra example / exploratory checks
// ------------------------------------------------------------
test('test', async ({ page }) => {
  await expect(phoneLink).toBeVisible();
  await expect(page.locator('app-brand-hero-banner')).toContainText('08003457788');
  await expect(page.locator('app-brand-hero-banner')).toMatchAriaSnapshot(`
    - link /\\d+/:
      - /url: tel:08003457788
    `);
});