import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignInPage extends BasePage {
  readonly emailField: Locator;
  readonly nextButton: Locator;
  readonly signInButton: Locator;
  readonly passwordField: Locator;
  readonly userAvatar: Locator;
  readonly heading: Locator;
  readonly signInLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailField = page.getByRole('textbox', { name: 'Email address' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.passwordField = page.locator('[id="Authentication_Password"]');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.userAvatar = page.getByRole('figure', { name: 'Avatar for Craig Brett' });
    this.heading = page.getByRole('heading', { name: 'Sign in using your NBS ID' });
    this.signInLink = page.getByRole('button', { name: 'Sign in' }).first();
  }

  async open() {
    await this.page.goto('https://source.thenbs.com/en/gb');
    await this.signInLink.click();
  }

  async enterEmail() {
    const email = process.env.NBS_EMAIL;
    if (!email) throw new Error('NBS_EMAIL must be set in .env');
    await this.emailField.fill(email);
  }

  async submitEmail() {
    await this.nextButton.click();
  }

  async enterPassword() {
    const password = process.env.NBS_PASSWORD;
    if (!password) throw new Error('NBS_PASSWORD must be set in .env');
    await this.passwordField.fill(password);
  }

  async submitPassword() {
    await this.signInButton.click();
  }
}
