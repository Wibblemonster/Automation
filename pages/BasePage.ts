import { type Page } from '@playwright/test';

// Elements shared by every page (such as the header, footer, and cookie banner) belong here.
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loadAllImages() {
    await this.page.evaluate(async () => {
      const viewportHeight = window.innerHeight;

      for (
        let position = 0;
        position < document.documentElement.scrollHeight;
        position += viewportHeight
      ) {
        window.scrollTo(0, position);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    });

    await this.page.waitForFunction(() =>
      Array.from(document.images).every(image => image.complete)
    );
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }
}
