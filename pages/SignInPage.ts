import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignInPage extends BasePage {
  private readonly emailField: Locator;
  private readonly nextButton: Locator;
  private readonly signInButton: Locator;
  private readonly passwordField: Locator;
  private readonly userAvatar: Locator;

  constructor(page: Page) {
    super(page);
    this.emailField = page.getByRole('textbox', { name: 'Email address' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.passwordField = page.locator('[id="Authentication_Password"]');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.userAvatar = page.getByRole('figure', { name: 'Avatar for Craig Brett' });
  }

  async login() {
    const email = process.env.NBS_EMAIL;
    const password = process.env.NBS_PASSWORD;

    if (!email || !password) {
      throw new Error('NBS_EMAIL and NBS_PASSWORD must be set in .env');
    }

    await this.emailField.fill(email);
    await this.nextButton.click();
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.fill(password);
    await this.signInButton.click();
    await expect(this.userAvatar).toBeVisible();
  }
}
