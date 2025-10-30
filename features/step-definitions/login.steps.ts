import { LoginPage } from '../../pages/loginPage';
import { After, Before, Given, When, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page } from '@playwright/test';
import { expect } from "@playwright/test";;


let loginPage: LoginPage;
let browser: Browser;
let page: Page;


Before(async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  loginPage = new LoginPage(page); // Initialize page object
});

After(async () => {
  await page.close();
  await browser.close();
});

Given('User is on the login page', async () => {
  await loginPage.goto();
});

When('user enter the {string} and {string} and click on login button', async (username: string, password: string) => {
  await loginPage.login(username, password);
});

Then('the user should see the dashboard page', async () => {
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page).toHaveTitle("Swag Labs");
});

