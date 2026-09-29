import { type Page } from '@playwright/test';

// Shared base for all page objects. Put elements common to every page
// (header, footer, cookie banner, etc.) here.
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
