import { test, expect } from '../fixtures/testFixtures';
import { verifyUrl } from '../utils/utils';

const menuItems = ["All Items", "About", "Logout", "Reset App State"];

test('Verify that the hamburger menu displays the correct items and each is visible', async ({ inventoryPage, menuPage }) => {
    await inventoryPage.verifyInventoryPageIsVisible();
    await menuPage?.clickOnHamburgerMenu();
    await menuPage?.countHamburgerMenuItems(menuItems);
    await menuPage?.verifyHamburgerMenuItemsVisibility(menuItems);
});

test('Verify clicking on About redirects to SauceLabs page', async ({ page, inventoryPage, menuPage }) => {
    await inventoryPage.verifyInventoryPageIsVisible();
    await menuPage?.clickOnHamburgerMenu();
    await menuPage?.verifyHamburgerMenuItemsVisibility(menuItems);
    await menuPage?.clickOnMenuItem("About");
    await verifyUrl(page, /saucelabs\.com/);
});

test('Verify clicking on Logout redirects to Swag Sabs login page', async ({ page, inventoryPage, menuPage }) => {
    await inventoryPage.verifyInventoryPageIsVisible();
    await menuPage?.clickOnHamburgerMenu();
    await menuPage?.verifyHamburgerMenuItemsVisibility(menuItems);
    await menuPage?.clickOnMenuItem("Logout");
    await verifyUrl(page, /saucedemo\.com/);
});