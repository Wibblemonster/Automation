import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DysonManufacturerPage extends BasePage {
  readonly url =
    'https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview';
  readonly urlManufacturer = 'https://manufacturers.thenbs.com/nbs-source';
  readonly urlLinkedIn = 'https://www.linkedin.com/company/dyson/';
  //Locators
  readonly phoneLink: Locator;
  readonly h1Heading: Locator;
  readonly manufacturerButton: Locator;
  readonly linkedInButton: Locator;
  readonly navBar: Locator;
  readonly link: Locator;
  readonly scrollToTopButton: Locator;

  constructor(page: Page) {
    super(page);
    this.phoneLink = page.locator('a[title="Call 08003457788"]');
    this.h1Heading = page.getByRole('heading', { level: 1 });
    this.manufacturerButton = page.getByRole('link', { name: "I'm a manufacturer" });
    this.navBar = page.locator('app-secondary-navbar');
    this.link = this.manufacturerButton;
    this.scrollToTopButton = page.locator(
      'button:has(mat-icon[data-mat-icon-name="arrow-up-to-line"])'
    );

    this.linkedInButton = page.getByRole('link', { name: 'Visit LinkedIn' });
  }
  //Actions
  // ------------------------------------------------------------
  // Navigation
  // ------------------------------------------------------------
  async open() {
    await this.page.goto(this.url);
    await this.assertPageUrl();
  }
  // ------------------------------------------------------------
  // Page URL checks
  // ------------------------------------------------------------
  async assertPageUrl() {
    await expect(this.page).toHaveURL(this.url);
  }
  // ------------------------------------------------------------
  // Manufacturer link checks
  // ------------------------------------------------------------

  async assertManufacturerButton() {
    await expect(this.page).toHaveURL(this.url);
    await expect(this.manufacturerButton).toBeVisible();
    await expect(this.navBar).toContainText("I'm a manufacturer");
    await expect(this.manufacturerButton).toHaveAttribute('href', this.urlManufacturer);
  }

  // ------------------------------------------------------------
  // Tab and navigation checks
  // ------------------------------------------------------------
  async assertManufacturerTabs() {
    const expectedTabs = [
      {
        name: 'Overview',
        dataCy: 'overviewTab',
        href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview',
      },
      {
        name: 'Products',
        dataCy: 'productsTab',
        href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/products',
      },
      {
        name: 'Certifications',
        dataCy: 'certificatesTab',
        href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/third-party-certifications',
      },
      {
        name: 'Literature',
        dataCy: 'literatureTab',
        href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/literature',
      },
      {
        name: 'Case studies',
        dataCy: 'caseStudiesTab',
        href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/case-studies',
      },
      {
        name: 'About us',
        dataCy: 'aboutTab',
        href: '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/about',
      },
    ];

    const tabLinks = this.page.getByRole('tablist').getByRole('tab');

    await expect(tabLinks).toHaveCount(expectedTabs.length);

    for (const [index, expected] of expectedTabs.entries()) {
      const link = tabLinks.nth(index);

      await expect(link).toBeVisible();
      await expect(link).toContainText(expected.name);
      await expect(link).toHaveAttribute('data-cy', expected.dataCy);
      await expect(tabLinks).toHaveText(expectedTabs.map(tab => tab.name));
    }

    const actualLabels = await tabLinks.evaluateAll(els =>
      els.map(el => el.textContent?.trim() ?? '')
    );

    expect(actualLabels).toEqual(expectedTabs.map(tab => tab.name));
  }
  // ------------------------------------------------------------
  // Phone link checks
  // ------------------------------------------------------------
  async assertPhoneLinkDetails() {
    await expect(this.phoneLink).toBeVisible();
    await expect(this.phoneLink).toContainText('08003457788');
    await expect(this.phoneLink).toHaveAttribute('title', 'Call 08003457788');
    await expect(this.phoneLink).toHaveAttribute('href', 'tel:08003457788');
  }
  // ------------------------------------------------------------
  // Check Linkedin link is correct and opens in a new tab
  // ------------------------------------------------------------
  async assertLinkedInLink() {
    await expect(this.linkedInButton).toBeVisible();
    await expect(this.linkedInButton).toHaveAttribute('href', this.urlLinkedIn);
    await expect(this.linkedInButton).toHaveAttribute('target', '_blank');
    await expect(this.linkedInButton).toHaveAttribute('title', 'Visit LinkedIn');
  }
  // ------------------------------------------------------------
  // Scroll to top button checks
  // ------------------------------------------------------------
  async assertScrollToTopButton() {
    // Verify button is not visible when at the top of the page
    await expect(this.scrollToTopButton).not.toBeVisible();

    // Scroll the page down
    await this.page.evaluate(() => window.scrollBy(0, 500));

    // Verify button becomes visible after scrolling
    await expect(this.scrollToTopButton).toBeVisible();

    // Click the button to scroll back to top
    await this.scrollToTopButton.click();

    // Verify page scrolled back to top
    await expect
      .poll(async () => await this.page.evaluate(() => window.scrollY), { timeout: 5000 })
      .toEqual(0);

    // Verify button is hidden again
    await expect(this.scrollToTopButton).not.toBeVisible();
  }

  // ------------------------------------------------------------
}
