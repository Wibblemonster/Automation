import { test as base } from '@playwright/test';
import { NBSHomePage } from '../pages/NBSHomePage';
import { DysonManufacturerPage } from '../pages/DysonManufacturerPage';
import { BasePage } from '../pages/BasePage';

// Extend the base test to include our custom fixtures
type Pages = {
  nbsHomePage: NBSHomePage;
  dysonManufacturerPage: DysonManufacturerPage;
  basePage: BasePage;
};

export const test = base.extend<Pages>({
  nbsHomePage: async ({ page }, use) => {
    await use(new NBSHomePage(page));
  },
  dysonManufacturerPage: async ({ page }, use) => {
    const dysonManufacturerPage = new DysonManufacturerPage(page);
    await dysonManufacturerPage.open();
    await use(dysonManufacturerPage);
  },
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
});

//re-export everything from the base test for convenience
export { expect } from '@playwright/test';
