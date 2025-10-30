import { Page } from "@playwright/test";  //means we only import the Page type from Playwright.

export class LoginPage {
  readonly page: Page;  // readonly means -> Property cannot be reassigned later
  readonly username;
  readonly password;
  readonly loginbt;
  readonly errorMessage;

  constructor(page: Page) {
    this.page = page;
    this.username = this.page.locator("#user-name");
    this.password = this.page.locator("#password");
    this.loginbt = this.page.locator("#login-button");
    this.errorMessage = this.page.locator('h3[data-test="error"]');
    
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
