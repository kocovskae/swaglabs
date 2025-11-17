import { filter } from 'rxjs';
import { FilterPage } from './../pages/filterPage';
import { test, expect } from '../fixtures/testFixtures';

test('Verify default filter sorts products from A to Z', async ({ page, inventoryPage, filterPage }) => {
    await inventoryPage.verifyInventoryPageIsVisible();
    //check default filter
    const defaultFilter = await page.locator(".active_option").textContent();
    expect(defaultFilter).toBe("Name (A to Z)");
    await filterPage?.getProductsNamesByAscOrder();
})

test('Verify product order changes to Z → A after applying Name filter', async ({ inventoryPage, filterPage }) => {
    await inventoryPage.verifyInventoryPageIsVisible();
    await filterPage?.selectFilterOption("za");
    await filterPage?.getProductsNamesByDescOrder();
});

test('Verify Price (low to high) filter sorts products correctly', async ({ inventoryPage, filterPage }) => {
    await inventoryPage.verifyInventoryPageIsVisible();
    await filterPage?.selectFilterOption("lohi");
    await filterPage?.getProductsByLowestPrice();
});

test('Verify Price (high to low) filter sorts products correctly', async ({ inventoryPage, filterPage }) => {
    await inventoryPage.verifyInventoryPageIsVisible();
    await filterPage?.selectFilterOption("hilo");
    await filterPage?.getProductsByHighestPrice();
});

test('Verify selected filter after page refresh is back to default filter', async ({ inventoryPage, filterPage }) => {
    await inventoryPage.verifyInventoryPageIsVisible();
    await filterPage?.selectFilterOption("lohi");
    await filterPage?.verifyFilterResetsToDefault();
});