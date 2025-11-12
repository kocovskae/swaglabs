import { test, expect } from '@playwright/test'
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { verifyUrl } from '../utils/utils';
import { fillForm } from '../utils/utils';
import { CheckoutPage } from '../pages/checkoutPage';

let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto('https://www.saucedemo.com/inventory.html');
});

test('Verify redirection to Checkout page after clicking Checkout button', async ({ page }) => {
    await inventoryPage.addToCart(0);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await checkoutPage.clickOnCheckoutButton();
    await verifyUrl(page, /checkout-step-one\.html/)
});

test('Verify that the Checkout form is displayed', async ({ page }) => {
    await inventoryPage.addToCart(0);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await checkoutPage.clickOnCheckoutButton();
    await checkoutPage.verifyCheckoutFormIsVisible();
});

test('Verify that the Cancel and Continue buttons are displayed on the Checkout form', async ({ page }) => {
    await inventoryPage.addToCart(0);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await checkoutPage.clickOnCheckoutButton();
    await checkoutPage.verifyCancelButtonIsVisible();
    await checkoutPage.verifyContinueButtonIsVisible();
});

test('Verify that the Checkout Overview page displays product and order details', async ({ page }) => {
    await inventoryPage.addToCart(3);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await checkoutPage.clickOnCheckoutButton();
    await fillForm(page, [{ "locator": "#first-name", "value": "Elena" },
    { "locator": "#last-name", "value": "Test" },
    { "locator": "#postal-code", "value": "1100" }]);
    await checkoutPage.clickContinueButton();
    await inventoryPage.verifyProductNamesAreVisible();
    await checkoutPage.verifyPaymentOrderDetails(0, "Payment Information:", 0, /^SauceCard\s#\d+$/);
    await checkoutPage.verifyPaymentOrderDetails(1, "Shipping Information:", 1, /(delivery|shipping)/i);
    await checkoutPage.verifyPriceTotals(/^Item total:\s\$\d+(\.\d{2})?$/, /^Tax:\s\$\d+(\.\d{2})?$/, /^Total:\s\$\d+(\.\d{2})?$/)
});

test('Verify that clicking Cancel on the Checkout Overview redirects the user to the Products page', async ({ page }) => {
    await inventoryPage.addToCart(3);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await checkoutPage.clickOnCheckoutButton();
    await fillForm(page, [{ "locator": "#first-name", "value": "Elena" },
    { "locator": "#last-name", "value": "Test" },
    { "locator": "#postal-code", "value": "1100" }]);
    await checkoutPage.clickContinueButton();
    await verifyUrl(page, /checkout-step-two\.html/)
    await checkoutPage.clickCancelButton();
    await verifyUrl(page, /inventory\.html/)
})

test('Verify that completing checkout shows a successful payment confirmation', async ({ page }) => {
    await inventoryPage.addToCart(3);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await checkoutPage.clickOnCheckoutButton();
    await fillForm(page, [{ "locator": "#first-name", "value": "Elena" },
    { "locator": "#last-name", "value": "Test" },
    { "locator": "#postal-code", "value": "1100" }]);
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickFinishButton();
    await verifyUrl(page, /checkout-complete\.html/);
    await checkoutPage.verifySuccessfullPaymentMessage();
});

test('Verify that the user can successfully complete the checkout process', async ({ page }) => {
    await inventoryPage.addToCart(0);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
    await checkoutPage.clickOnCheckoutButton();
    await fillForm(page, [{ "locator": "#first-name", "value": "Elena" },
    { "locator": "#last-name", "value": "Test" },
    { "locator": "#postal-code", "value": "1100" }]);
    await checkoutPage.clickContinueButton();
    await verifyUrl(page, /checkout-step-two\.html/);
    await inventoryPage.verifyProductNamesAreVisible();
    await checkoutPage.clickFinishButton();
    await verifyUrl(page, /checkout-complete\.html/)
    await checkoutPage.verifySuccessfullPaymentMessage();
});

test('Verify error messages for invalid inputs in Checkout form', async ({ page }) => {
    await cartPage.clickOnCartIcon();
    await checkoutPage.clickOnCheckoutButton();
    await checkoutPage.verifyCheckoutFormIsVisible();
    await fillForm(page, [{ "locator": "#first-name", "value": "Elena" },
    { "locator": "#last-name", "value": "Test" },
    { "locator": "#postal-code", "value": "" }]);
    await checkoutPage.clickContinueButton();
    await checkoutPage.verifyErrorMessage("Error: Postal Code is required");
});