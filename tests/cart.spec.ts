import { test, expect } from '../fixtures/testFixtures';


test('Verify that clicking on the cart icon opens the cart page', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.verifyInventoryPageIsVisible();
    await cartPage?.clickOnCartIcon();
    await cartPage?.verifyCartPageIsDisplayed();
});

test('Verify that the cart icon displays the correct number of products added to the cart.', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(2);
    await cartPage?.verifyProductsAreDisplayedInCartBadge("1");
});

test('Verify that the added product is displayed on the Cart page', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(2);
    await cartPage?.clickOnCartIcon();
    await cartPage?.verifyCartPageIsDisplayed();
    await cartPage?.verifyProductsInCart("Sauce Labs Bolt T-Shirt");
})

test('Verify that user can add multiple products to the cart and they are displayed correctly', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(0);
    await inventoryPage.addToCart(4);
    await cartPage?.clickOnCartIcon();
    await cartPage?.verifyCartPageIsDisplayed();
    await cartPage?.countProductsInCartPage();
    await cartPage?.verifyProductsInCart("Sauce Labs Backpack");
    await cartPage?.verifyProductsInCart("Sauce Labs Onesie");
})

test('Verify that Continue Shopping and Checkout are dispayed on cart page', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(2);
    await cartPage?.clickOnCartIcon();
    await cartPage?.verifyCartPageIsDisplayed();
    await cartPage?.verifyContinueShoppingButtonIsDisplayed();
    await cartPage?.verifyCheckoutButtonIsDisplayed();
})

test('Verify that product can be removed from the cart page', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(2);
    await cartPage?.clickOnCartIcon();
    await cartPage?.verifyCartPageIsDisplayed();
    await cartPage?.removeProductFromCart();
    await cartPage?.verifyThatProductIsRemovedFromCart();
})

test('Continue Shopping button navigates back to Products page', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(2);
    await cartPage?.clickOnCartIcon();
    await cartPage?.verifyCartPageIsDisplayed();
    await cartPage?.verifyContinueShoppingButtonIsDisplayed();
    await cartPage?.clickOnContinueShopping();
    await inventoryPage.verifyInventoryPageIsVisible();
})






