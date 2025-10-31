import { Page, expect } from "@playwright/test"

export class MenuPage {
    readonly page: Page;
    readonly menuIcon;
    readonly menuList;

    constructor(page: Page) {
        this.page = page;
        this.menuIcon = this.page.locator("#react-burger-menu-btn");
        this.menuList = this.page.locator(".bm-item-list a");
    }


    async verifyThatHamburgerMenuIsVisible() {
        await expect(this.menuIcon).toBeVisible();
    }

    async clickOnHamburgerMenu() {
        await this.menuIcon.click();
    }

    async countHamburgerMenuItems(menuItems: string[]) {
        await expect(this.menuList).toHaveCount(menuItems.length);
    }

    async verifyHamburgerMenuItemsVisibility(menuItems: string[]) {
        for (const item of menuItems) {
            await expect(this.menuList.filter({ hasText: item })).toBeVisible();
        }
    }

    async clickOnMenuItem(item: string) {
        const menuItem = this.menuList.filter({ hasText: item });
        await expect(menuItem).toBeVisible();
        await menuItem.click();
    }
}