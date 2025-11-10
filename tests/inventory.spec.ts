import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { verifyUrl } from '../utils/utils';

let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  inventoryPage = new InventoryPage(page);
  await page.goto('https://www.saucedemo.com/inventory.html');
});

test('Verify that Products are listed on inventory page', async ({ page }) => {
  await inventoryPage.verifyInventoryPageIsVisible();
  await inventoryPage.verifyProductsAreListed();
  await inventoryPage.verifyProductsHaveNamesAndPrices();
})

test('Verify that the product names and prices are visible on page', async ({ page }) => {
  await inventoryPage.verifyProductNamesAreVisible();
  await inventoryPage.verifyProductPricesAreVisible();
})

test('Verify that the user can add a product to Add cart', async ({ page }) => {
  await inventoryPage.addToCart(2);
  await inventoryPage.verifyProductIsAddedToCart(0);
})

test('Verify that product can be removed from Cart', async ({ page }) => {
  await inventoryPage.addToCart(1);
  await inventoryPage.verifyProductIsAddedToCart(0);
  await inventoryPage.removeProductFromProductsPage(0);
});

test('Verify that clicking a product redirects to the product detail page', async ({ page }) => {
  await inventoryPage.verifyInventoryPageIsVisible();
  await inventoryPage.verifyProductsAreListed();
  await inventoryPage.verifyProductNamesAreVisible();
  await inventoryPage.clickOnProduct();
  await verifyUrl(page, /inventory-item\.html\?id=4/)
})

test('Verify product details are displayed on the product detail page', async ({ page }) => {
  await inventoryPage.verifyInventoryPageIsVisible();
  await inventoryPage.verifyProductsAreListed();
  await inventoryPage.clickOnProduct();
  await inventoryPage.verifyProductDetailsOnProductPage();
})