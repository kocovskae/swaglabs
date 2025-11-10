import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartLink;
    readonly cartTitle;
    readonly cartBadge;
    readonly continueShoppingBtn;
    readonly checkoutButton;
    readonly addedProductName;
    readonly removeBtn;
    readonly cart;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator(".shopping_cart_link");
        this.cartTitle = page.locator(".title");
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.continueShoppingBtn = page.locator("#continue-shopping");
        this.checkoutButton = page.locator("#checkout");
        this.addedProductName = page.locator(".cart_item .inventory_item_name");
        this.removeBtn = page.locator(".cart_button");
        this.cart = page.locator(".cart_item");
    }

    async clickOnCartIcon() {
        await expect(this.cartLink).toBeVisible();
        await this.cartLink.click();
    }

    async verifyCartPageIsDisplayed() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html")
        await expect(this.cartTitle).toHaveText("Your Cart");
    }

    async verifyProductsAreDisplayedInCartBadge(value: string) {
        await expect(this.cartBadge).toBeVisible();
        await expect(this.cartBadge).toHaveText(value);
    }

    async verifyContinueShoppingButtonIsDisplayed() {
        await expect(this.continueShoppingBtn).toBeVisible();
    }

    async clickOnContinueShopping() {
        await this.continueShoppingBtn.click();
    }

    async verifyCheckoutButtonIsDisplayed() {
        await expect(this.checkoutButton).toBeVisible();
    }

    async verifyProductsInCart(products: string | string[]) {
        // Convert single string to array
        if (!Array.isArray(products)) {
            products = [products];
        }
        for (const name of products) {
            const product = this.addedProductName.filter({ hasText: name });
            await expect(product).toBeVisible();
        }
    }

    async removeProductFromCart() {
        await expect(this.removeBtn).toBeVisible();
        await (this.removeBtn).click();
    }

    async verifyThatProductIsRemovedFromCart() {
        await expect(this.cart).toBeHidden();
    }

    async countProductsInCartPage() {
        const products = await this.page.locator('.cart_item').count();
        return products;
    }
}

