import { test as base } from '@playwright/test';
import { NBSHomePage } from '../pages/NBSHomePage';
import { DysonManufacturerPage } from '../pages/DysonManufacturerPage';
import { SignInPage } from '../pages/SignInPage';

// Extend the base test to include our custom fixtures
type Pages = {
  nbsHomePage: NBSHomePage;
  dysonManufacturerPage: DysonManufacturerPage;
  signInPage: SignInPage;
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
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
});

//re-export everything from the base test for convenience
export { expect } from '@playwright/test';
