import { CartPage } from '../pages/cartPage'; //import your POM classes so you can create page object instances inside fixtures.
import { InventoryPage } from '../pages/inventoryPage';
import { test as base } from '@playwright/test'  //We rename it to base, because we will create our own custom test below using fixtures.
import { MenuPage } from '../pages/menuPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { FilterPage } from '../pages/filterPage';

export const test = base.extend<{   //You create a new custom test object.
    inventoryPage: InventoryPage;   //This allows you to add variables (fixtures) like inventoryPage and cartPage.
    cartPage?: CartPage;            //After this, your tests will use your custom test instead of Playwright’s default test.
    checkoutPage?: CheckoutPage;
    filterPage?: FilterPage;
    menuPage?: MenuPage;

}>({
    inventoryPage: async ({ page }, use) => {  //You define a new fixture named inventoryPage
        //Fixtures always receive: page → The Playwright page object and use() → A function that makes the fixture available to the test
        const inventory = new InventoryPage(page);  //You instantiate your POM class
        await page.goto('https://www.saucedemo.com/inventory.html'); //Every test that uses this fixture will automatically:Go to the inventory page BEFORE the test runs.
        await inventory.verifyInventoryPageIsVisible();
        await use(inventory); //This passes the created inventory object to the test.
    },

    cartPage: async ({ page }, use) => {
        const cart = new CartPage(page); //You instantiate your POM class
        await use(cart); //This passes the created inventory object to the test.
    },

    checkoutPage: async ({ page }, use) => {
        const checkout = new CheckoutPage(page);
        await use(checkout);
    },

    menuPage: async ({ page }, use) => {
        const menu = new MenuPage(page);
        await use(menu);
    },

    filterPage: async ({ page }, use) => {
        const filter = new FilterPage(page);
        await use(filter);
    },
});

export const expect = base.expect;  //This ensures you use Playwright's expect, not custom expect