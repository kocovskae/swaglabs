import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { FilterPage } from '../pages/filterPage';

let inventoryPage: InventoryPage;
let filterPage: FilterPage;

test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    filterPage = new FilterPage(page);

    await page.goto('https://www.saucedemo.com/inventory.html');
    await inventoryPage.verifyInventoryPageIsVisible();
})

test('Verify default filter sorts products from A to Z', async ({ page }) => {
    //check default filter
    const defaultFilter = await page.locator(".active_option").textContent();
    expect(defaultFilter).toBe("Name (A to Z)");
    await filterPage.getProductsNamesByAscOrder();
})

test('Verify product order changes to Z → A after applying Name filter', async ({ page }) => {
    await filterPage.selectFilterOption("za");
    await filterPage.getProductsNamesByDescOrder();
});

test('Verify Price (low to high) filter sorts products correctly', async ({ page }) => {
    await filterPage.selectFilterOption("lohi");
    await filterPage.getProductsByLowestPrice();
});

test('Verify Price (high to low) filter sorts products correctly', async ({ page }) => {
    await filterPage.selectFilterOption("hilo");
    await filterPage.getProductsByHighestPrice();
});

test('Verify selected filter after page refresh is back to default filter', async ({ page }) => {
    await filterPage.selectFilterOption("lohi");
    await filterPage.verifyFilterResetsToDefault();
});