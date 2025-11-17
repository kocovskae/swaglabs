import { test, expect } from '../fixtures/testFixtures';
import { verifyUrl } from '../utils/utils';

test('Verify that Products are listed on inventory page', async ({ inventoryPage }) => {
  await inventoryPage.verifyProductsAreListed();
  await inventoryPage.verifyProductsHaveNamesAndPrices();
})

test('Verify that the product names and prices are visible on page', async ({ inventoryPage }) => {
  await inventoryPage.verifyProductNamesAreVisible();
  await inventoryPage.verifyProductPricesAreVisible();
})

test('Verify that the user can add a product to Add cart', async ({ inventoryPage }) => {
  await inventoryPage.addToCart(2);
  await inventoryPage.verifyProductIsAddedToCart(0);
})

test('Verify that product can be removed from Cart', async ({ inventoryPage }) => {
  await inventoryPage.addToCart(1);
  await inventoryPage.verifyProductIsAddedToCart(0);
  await inventoryPage.removeProductFromProductsPage(0);
});

test('Verify that clicking a product redirects to the product detail page', async ({ page, inventoryPage }) => {
  await inventoryPage.verifyProductsAreListed();
  await inventoryPage.verifyProductNamesAreVisible();
  await inventoryPage.clickOnProduct();
  await verifyUrl(page, /inventory-item\.html\?id=4/)
})

test('Verify product details are displayed on the product detail page', async ({ inventoryPage }) => {
  await inventoryPage.verifyProductsAreListed();
  await inventoryPage.clickOnProduct();
  await inventoryPage.verifyProductDetailsOnProductPage();
})