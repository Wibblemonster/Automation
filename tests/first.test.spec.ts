import { test, expect } from '../fixtures/test-options';

const tabBasePath = '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U';

const expectedTabs = [
  { name: 'Overview', dataCy: 'overviewTab', href: `${tabBasePath}/overview` },
  { name: 'Products', dataCy: 'productsTab', href: `${tabBasePath}/products` },
  {
    name: 'Certifications',
    dataCy: 'certificatesTab',
    href: `${tabBasePath}/third-party-certifications`,
  },
  { name: 'Literature', dataCy: 'literatureTab', href: `${tabBasePath}/literature` },
  { name: 'Case studies', dataCy: 'caseStudiesTab', href: `${tabBasePath}/case-studies` },
  { name: 'About us', dataCy: 'aboutTab', href: `${tabBasePath}/about` },
];

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
  const { phoneLink } = dysonManufacturerPage;

  await expect(phoneLink).toBeVisible();
  await expect(phoneLink).toContainText('08003457788');
  await expect(phoneLink).toHaveAttribute('title', 'Call 08003457788');
  await expect(phoneLink).toHaveAttribute('href', 'tel:08003457788');
});

// ------------------------------------------------------------
// Check LinkedIn link is correct and opens in a new tab
// ------------------------------------------------------------
test('check LinkedIn link', async ({ dysonManufacturerPage }) => {
  const { linkedInButton, urlLinkedIn } = dysonManufacturerPage;

  await expect(linkedInButton).toBeVisible();
  await expect(linkedInButton).toHaveAttribute('href', urlLinkedIn);
  await expect(linkedInButton).toHaveAttribute('target', '_blank');
  await expect(linkedInButton).toHaveAttribute('title', 'Visit LinkedIn');
});

// ------------------------------------------------------------
// Scroll to top button checks
// ------------------------------------------------------------

test('check Scroll to top button', async ({ dysonManufacturerPage }) => {
  const { scrollToTopButton } = dysonManufacturerPage;

  // Button is hidden when at the top of the page
  await expect(scrollToTopButton).toBeHidden();

  // Button appears after scrolling down
  await dysonManufacturerPage.scrollDown();
  await expect(scrollToTopButton).toBeVisible();

  // Clicking it scrolls back to the top and hides the button again
  await scrollToTopButton.click();
  await expect.poll(() => dysonManufacturerPage.getScrollY(), { timeout: 5000 }).toBe(0);
  await expect(scrollToTopButton).toBeHidden();
});
