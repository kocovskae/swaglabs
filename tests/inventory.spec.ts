import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let username = "standard_user";
let password = "secret_sauce";

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);

});

test('Verify that Products are listed on inventory page', async ({page}) => {
    await inventoryPage.verifyInventoryPageIsVisible();
    await inventoryPage.verifyProductsAreListed();
    await inventoryPage.verifyProductsHaveNamesAndPrices();
})

test('Verify that the product names and prices are visible on page', async({page}) => {
    await inventoryPage.verifyProductNamesAreVisible();
    await inventoryPage.verifyProductPricesAreVisible();
})

test('Verify that the user can add a product to Add cart', async({page}) => {
    await inventoryPage.addToCart(2);
    await inventoryPage.verifyProductIsAddedToCart(0);
})

test('Verify that product can be removed from Cart', async ({ page }) => {
  await inventoryPage.addToCart(1);
  await inventoryPage.verifyProductIsAddedToCart(0);
  await inventoryPage.removeFromCart(0);
});