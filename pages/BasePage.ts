import 'dotenv/config';
import { type Page, type Locator, expect } from '@playwright/test';

//Locator for the Dyson phone link on the current page.
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //actions
}
