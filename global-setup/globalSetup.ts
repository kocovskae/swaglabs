import { chromium } from '@playwright/test';

async function globalSetup() {
    const browser = await chromium.launch({ headless: true }); //means the browser runs in the background, without opening a visible window.
    const page = await browser.newPage();  //Opens a new browser page/tab inside the launched browser.

    // Go to login page
    await page.goto('https://www.saucedemo.com/');

    // Perform login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Wait until login is successful
    await page.waitForURL(/inventory\.html/);

    // Save storage state (cookies + localStorage) storageState.json can later be used in tests to reuse the logged-in session without logging in again.
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;