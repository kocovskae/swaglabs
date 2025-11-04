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

test('Verify that the Checkout Overview page displays product and order details', async ({ page }) => {
    await inventoryPage.addToCart(3);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await page.locator("#checkout").click();
    await fillForm(page, [{ "locator": "#first-name", "value": "Elena" },
    { "locator": "#last-name", "value": "Test" },
    { "locator": "#postal-code", "value": "1100" }]);
    await page.locator("#continue").click();
    await inventoryPage.verifyProductNamesAreVisible();
    await expect(page.locator(".summary_info_label").nth(0)).toHaveText("Payment Information:")
    const paymentValue = await page.locator(".summary_value_label").nth(0).innerText();
    expect(paymentValue).toMatch(/^SauceCard\s#\d+$/);
    await expect(page.locator(".summary_info_label").nth(1)).toHaveText("Shipping Information:")
    const shippingValue = await page.locator(".summary_value_label").nth(1).innerText();
    expect(shippingValue).toMatch(/(delivery|shipping)/i);
    await expect(page.locator(".summary_info_label").nth(2)).toHaveText("Price Total")
    const itemTotal = await page.locator(".summary_subtotal_label").innerText();
    expect(itemTotal).toMatch(/^Item total:\s\$\d+(\.\d{2})?$/);
    const itemTax = await page.locator(".summary_tax_label").innerText();
    expect(itemTax).toMatch(/^Tax:\s\$\d+(\.\d{2})?$/);
    const totalPrice = await page.locator(".summary_total_label").innerText();
    expect(totalPrice).toMatch(/^Total:\s\$\d+(\.\d{2})?$/);
});

test('Verify that clicking Cancel on the Checkout Overview redirects the user to the Products page', async ({ page }) => {
    await inventoryPage.addToCart(3);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await page.locator("#checkout").click();
    await fillForm(page, [{ "locator": "#first-name", "value": "Elena" },
    { "locator": "#last-name", "value": "Test" },
    { "locator": "#postal-code", "value": "1100" }]);
    await page.locator("#continue").click();
    await verifyUrl(page, /checkout-step-two\.html/)
    await page.locator("#cancel").click();
    await verifyUrl(page, /inventory\.html/)
})

test('Verify that completing checkout shows a successful payment confirmation', async ({ page }) => {
    await inventoryPage.addToCart(3);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await page.locator("#checkout").click();
    await fillForm(page, [{ "locator": "#first-name", "value": "Elena" },
    { "locator": "#last-name", "value": "Test" },
    { "locator": "#postal-code", "value": "1100" }]);
    await page.locator("#continue").click();
    await page.locator("#finish").click();
    await verifyUrl(page, /checkout-complete\.html/);
    const successfulPaymentMsg = await page.locator(".complete-header", { hasText: "Thank you for your order!" });
    await expect(successfulPaymentMsg).toBeVisible();
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