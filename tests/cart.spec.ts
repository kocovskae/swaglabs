import { test, expect } from '@playwright/test'
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';

let inventoryPage: InventoryPage;
let cartPage: CartPage;


test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await page.goto('https://www.saucedemo.com/inventory.html');
    await inventoryPage.verifyInventoryPageIsVisible();
})

test('Verify that clicking on the cart icon opens the cart page', async ({ page }) => {
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
});

test('Verify that the cart icon displays the correct number of products added to the cart.', async ({ page }) => {
    await inventoryPage.addToCart(2);
    await cartPage.verifyProductsAreDisplayedInCartBadge("1");
});

test('Verify that the added product is displayed on the Cart page', async ({ page }) => {
    await inventoryPage.addToCart(2);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyProductsInCart("Sauce Labs Bolt T-Shirt");
})

test('Verify that user can add multiple products to the cart and they are displayed correctly', async ({ page }) => {
    await inventoryPage.addToCart(0);
    await inventoryPage.addToCart(4);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.countProductsInCartPage();
    await cartPage.verifyProductsInCart("Sauce Labs Backpack");
    await cartPage.verifyProductsInCart("Sauce Labs Onesie");
})

test('Verify that Continue Shopping and Checkout are dispayed on cart page', async ({ page }) => {
    await inventoryPage.addToCart(2);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyContinueShoppingButtonIsDisplayed();
    await cartPage.verifyCheckoutButtonIsDisplayed();
})

test('Verify that product can be removed from the cart page', async ({ page }) => {
    await inventoryPage.addToCart(2);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.removeProductFromCart();
    await cartPage.verifyThatProductIsRemovedFromCart();
})

test('Continue Shopping button navigates back to Products page', async ({ page }) => {
    await inventoryPage.addToCart(2);
    await cartPage.clickOnCartIcon();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.verifyContinueShoppingButtonIsDisplayed();
    await cartPage.clickOnContinueShopping();
    await inventoryPage.verifyInventoryPageIsVisible();
})






