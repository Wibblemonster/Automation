import { test, expect } from '../fixtures/test-options';
import { DYSON_MANUFACTURER_PATH as tabBasePath } from '../pages/DysonManufacturerPage';

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

test.only('Visual regression: Dyson manufacturer homepage', async ({ dysonManufacturerPage }) => {
  await expect(dysonManufacturerPage.h1Heading).toBeVisible();
  await dysonManufacturerPage.loadAllImages();
  await expect(dysonManufacturerPage.page).toHaveScreenshot('dyson-manufacturer-homepage.png', {
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
    maxDiffPixelRatio: 0.001,
  });
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

// ------------------------------------------------------------
// User login checks
// ------------------------------------------------------------

test('User Login', async ({ signInPage }) => {
  await signInPage.open();
  await expect(signInPage.page).toHaveURL(/https:\/\/login\.thenbs\.com\/auth\/login/);
  await expect(signInPage.heading).toBeVisible();
  await expect(signInPage.emailField).toBeVisible();

  await signInPage.enterEmail();
  await signInPage.submitEmail();
  await expect(signInPage.passwordField).toBeVisible();

  await signInPage.enterPassword();
  await signInPage.submitPassword();
  await expect(signInPage.userAvatar).toBeVisible();
});
