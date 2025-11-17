import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartLink;
    readonly cartTitle;
    readonly continueShoppingBtn;
    readonly checkoutButton;
    readonly addedProductName;
    readonly removeBtn;
    readonly cart;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartTitle = page.locator('[data-test="title"]');
        this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.addedProductName = page.locator('[data-test="inventory-item"]');
        this.removeBtn = page.getByRole('button', { name: "Remove" });
        this.cart = page.locator('[data-test="inventory-item"]');
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
        await expect(this.cartLink).toBeVisible();
        await expect(this.cartLink).toHaveText(value);
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

