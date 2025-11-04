import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { verifyUrl } from '../utils/utils';
import { fillForm } from '../utils/utils';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let username = "standard_user";
let password = "secret_sauce";

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
});

test('Verify redirection to Checkout page after clicking Checkout button', async ({ page }) => {
    await inventoryPage.addToCart(0);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await page.locator("#checkout").click();
    await verifyUrl(page, /checkout-step-one\.html/)
});

test('Verify that the Checkout form is displayed', async ({ page }) => {
    await inventoryPage.addToCart(0);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await page.locator("#checkout").click();
    const firstName = page.locator("#first-name");
    await expect(firstName).toBeVisible();
    const lastName = page.locator("#last-name");
    await expect(lastName).toBeVisible();
    const zipCode = page.locator("#postal-code");
});

test('Verify that the Cancel and Continue buttons are displayed on the Checkout form', async ({ page }) => {
    await inventoryPage.addToCart(0);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await page.locator("#checkout").click();
    const cancelButton = page.locator("#cancel");
    await expect(cancelButton).toBeVisible();
    const continueButton = page.locator("#continue");
    await expect(continueButton).toBeVisible();
});



test('Verify that the user can successfully complete the checkout process', async ({ page }) => {
    await inventoryPage.addToCart(0);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await page.locator("#checkout").click();
    await fillForm(page, [{ "locator": "#first-name", "value": "Elena" },
    { "locator": "#last-name", "value": "Test" },
    { "locator": "#postal-code", "value": "1100" }]);
    await page.locator("#continue").click();
    await verifyUrl(page, /checkout-step-two\.html/);
    await inventoryPage.verifyProductNamesAreVisible();
    const summaryInfo = page.locator(".summary_info");
    await expect(summaryInfo).toBeVisible();
    await page.locator("#finish").click();
    await verifyUrl(page, /checkout-complete\.html/)
    const thankYouMessage = page.locator(".complete-header", { hasText: "Thank you for your order!" });
    await expect(thankYouMessage).toHaveText("Thank you for your order!");
});