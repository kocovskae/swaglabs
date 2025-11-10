import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { FilterPage } from '../pages/filterPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let filterPage: FilterPage;
let username = "standard_user";
let password = "secret_sauce";

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    filterPage = new FilterPage(page);
    const username = "standard_user";
    const password = "secret_sauce";

    await loginPage.goto();
    await loginPage.login(username, password);
    await inventoryPage.verifyInventoryPageIsVisible();
})

test('Verify default filter sorts products from A to Z', async ({page}) => {
    //check default filter
    const defaultFilter = await page.locator(".active_option").textContent();
    expect(defaultFilter).toBe("Name (A to Z)");
    await filterPage.getProductsNamesByAscOrder();
})

test('Verify product order changes to Z → A after applying Name filter', async({page}) => {
    await filterPage.selectFilterOption("za");
    await filterPage.getProductsNamesByDescOrder();
});

test('Verify Price (low to high) filter sorts products correctly', async({page}) => {
    await filterPage.selectFilterOption("lohi");
    await filterPage.getProductsByLowestPrice();
});

test('Verify Price (high to low) filter sorts products correctly', async({page}) => {
    await filterPage.selectFilterOption("hilo");
    await filterPage.getProductsByHighestPrice();
});

test.only('Verify selected filter after page refresh is back to default filter', async ({ page }) => {
  await filterPage.selectFilterOption("lohi");
  await filterPage.verifyFilterResetsToDefault();
});