import { type Page } from '@playwright/test';

// Elements shared by every page (such as the header, footer, and cookie banner) belong here.
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
