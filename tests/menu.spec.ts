import { InventoryPage } from './../pages/inventoryPage';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { MenuPage } from '../pages/menuPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let menuPage: MenuPage;
const menuItems = ["All Items", "About", "Logout", "Reset App State"];

test('Verify that menu sidebar is visible', async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    menuPage = new MenuPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.verifyInventoryPageIsVisible();
    await menuPage.verifyThatHamburegerMenuIsVisible();
});

test('Verify that menu items are visible', async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    menuPage = new MenuPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.verifyInventoryPageIsVisible();
    await menuPage.clickOnHamburgerMenu();
    await menuPage.countHamburgerMenuItems(menuItems);
    for (const item of menuItems) {
        await expect(page.locator(".bm-item-list a").filter({ hasText: item })).toBeVisible();
    }
});

test('Verify clicking on About redirects to SauceLabs page', async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.verifyInventoryPageIsVisible();
    await page.locator("#react-burger-menu-btn").click();
    const aboutLink = page.locator(".bm-item-list a").filter({ hasText: "About" });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page).toHaveURL(/https?:\/\/(www\.)?saucelabs\.com\/?/);
});

test('Verify clicking on Logout redirects to Swag Sabs login page', async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.verifyInventoryPageIsVisible();
    await page.locator("#react-burger-menu-btn").click();
    const aboutLink = page.locator(".bm-item-list a").filter({ hasText: "Logout" });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page).toHaveURL(/https?:\/\/(www\.)?saucedemo\.com\/?/);
});