import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DysonManufacturerPage extends BasePage {
  readonly url =
    'https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview';
  readonly urlManufacturer = 'https://manufacturers.thenbs.com/nbs-source';
  //Locators
  readonly phoneLink: Locator;
  readonly h1Heading: Locator;
  readonly manufacturerButton: Locator;
  readonly navBar: Locator;
  readonly link: Locator;

  constructor(page: Page) {
    super(page);
    this.phoneLink = page.locator('a[title="Call 08003457788"]');
    this.h1Heading = page.getByRole('heading', { level: 1 });
    this.manufacturerButton = page
      .locator('a[href*="manufacturers.thenbs.com"], a[href*="nbs-source"]')
      .first();
    this.navBar = page.locator('app-secondary-navbar');
    this.link = this.manufacturerButton;
  }
  //Actions
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
    await expect(this.link).toHaveAttribute('href', this.urlManufacturer);
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

    const tabLinks = this.page.locator('div.mat-mdc-tab-list a[mat-tab-link]');

    await expect(tabLinks).toHaveCount(expectedTabs.length);

    for (const [index, expected] of expectedTabs.entries()) {
      const link = tabLinks.nth(index);

      await expect(link).toBeVisible();
      await expect(link).toContainText(expected.name);
      await expect(link).toHaveAttribute('data-cy', expected.dataCy);
      await expect(link).toHaveAttribute('href', expected.href);
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
}
