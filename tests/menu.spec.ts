import { InventoryPage } from './../pages/inventoryPage';
import { test, expect } from '@playwright/test';
import { MenuPage } from '../pages/menuPage';
import { verifyUrl } from '../utils/utils';

let inventoryPage: InventoryPage;
let menuPage: MenuPage;
const menuItems = ["All Items", "About", "Logout", "Reset App State"];

test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    menuPage = new MenuPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await inventoryPage.verifyInventoryPageIsVisible();
    await menuPage.verifyThatHamburgerMenuIsVisible();
    await menuPage.clickOnHamburgerMenu();
});

test('Verify that the hamburger menu displays the correct items and each is visible', async ({ page }) => {
    await menuPage.countHamburgerMenuItems(menuItems);
    await menuPage.verifyHamburgerMenuItemsVisibility(menuItems);
});

test('Verify clicking on About redirects to SauceLabs page', async ({ page }) => {
    await menuPage.verifyHamburgerMenuItemsVisibility(menuItems);
    await menuPage.clickOnMenuItem("About");
    await verifyUrl(page, /saucelabs\.com/);
});

test('Verify clicking on Logout redirects to Swag Sabs login page', async ({ page }) => {
    await menuPage.verifyHamburgerMenuItemsVisibility(menuItems);
    await menuPage.clickOnMenuItem("Logout");
    await verifyUrl(page, /saucedemo\.com/);
});