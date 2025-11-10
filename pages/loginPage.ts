import { Page } from "@playwright/test";  //means we only import the Page type from Playwright.

export class LoginPage {
  readonly page: Page;  // readonly means -> Property cannot be reassigned later
  readonly username;
  readonly password;
  readonly loginbt;
  readonly errorMessage;

  constructor(page: Page) {
    this.page = page;
    this.username = this.page.locator('[data-test="username"]');
    this.password = this.page.locator('[data-test="password"]');
    this.loginbt = this.page.locator('[data-test="login-button"]');
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(email: string, password: string) {
    await this.username.fill(email);
    await this.password.fill(password);
    await this.loginbt.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}
