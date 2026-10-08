import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export const DYSON_MANUFACTURER_PATH = '/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U';

export class DysonManufacturerPage extends BasePage {
  readonly url = `${DYSON_MANUFACTURER_PATH}/overview`;
  readonly urlManufacturer = 'https://manufacturers.thenbs.com/nbs-source';
  readonly urlLinkedIn = 'https://www.linkedin.com/company/dyson/';
  //Locators
  readonly phoneLink: Locator;
  readonly h1Heading: Locator;
  readonly manufacturerButton: Locator;
  readonly linkedInButton: Locator;
  readonly navBar: Locator;
  readonly tabs: Locator;
  readonly scrollToTopButton: Locator;

  constructor(page: Page) {
    super(page);
    this.phoneLink = page.getByRole('link', { name: '08003457788' });
    this.h1Heading = page.getByRole('heading', { level: 1 });
    this.manufacturerButton = page.getByRole('link', { name: "I'm a manufacturer" });
    this.navBar = page.locator('app-secondary-navbar');
    this.scrollToTopButton = page.locator('[data-cy="backToTopButton"]');
    this.linkedInButton = page.getByRole('link', { name: 'Visit LinkedIn' });
    this.tabs = page.getByRole('tablist').getByRole('tab');
  }
  //Actions
  // ------------------------------------------------------------
  // Navigation
  // ------------------------------------------------------------
  async open() {
    await this.page.goto(this.url);
    await expect(this.page).toHaveURL(this.url);
  }

  // ------------------------------------------------------------
  // Scrolling
  // ------------------------------------------------------------
  async scrollDown(pixels = 500) {
    await this.page.evaluate(y => window.scrollBy(0, y), pixels);
  }

  async getScrollY() {
    return this.page.evaluate(() => window.scrollY);
  }
}
