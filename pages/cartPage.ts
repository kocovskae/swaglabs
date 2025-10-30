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
    readonly emptyCart;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator(".shopping_cart_link");
        this.cartTitle = page.locator(".title");
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.continueShoppingBtn = page.locator("#continue-shopping");
        this.checkoutButton = page.locator("#checkout");
        this.addedProductName = page.locator(".cart_item .inventory_item_name");
        this.removeBtn = page.locator(".cart_button");
        this.emptyCart = page.locator(".cart_item");
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

    async verifyNameOfAddedProduct(value: string) {
        await expect(this.addedProductName).toBeVisible();
        await expect(this.addedProductName).toHaveText(value);
    }

    async removeProductFromCart() {
        await expect(this.removeBtn).toBeVisible();
        await (this.removeBtn).click();
    }

    async verifyThatProductIsRemovedFromCart() {
        await expect(this.emptyCart).toBeHidden();
    }
}

