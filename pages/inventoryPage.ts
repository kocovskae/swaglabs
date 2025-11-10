import { Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title;
  readonly productList;
  readonly productItems;
  readonly productNames;
  readonly productPrices;
  readonly addToCartButton;
  readonly removeCartButton;
  readonly productDetailsImage;
  readonly productDetailsName;
  readonly productDetailsDescription;
  readonly productDetailsPrice;
  readonly productDetailsAddCart;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.productList = page.locator('[data-test="inventory-list"]');
    this.productItems = this.productList.locator('[data-test="inventory-item"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = page.locator('.btn_inventory');
    this.removeCartButton = page.locator('.btn_secondary');
    this.productDetailsImage = page.locator(".inventory_details_img_container");
    this.productDetailsName = page.locator('[data-test="inventory-item-name"]');
    this.productDetailsDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productDetailsPrice = page.locator('[data-test="inventory-item-price"]');
    this.productDetailsAddCart = page.locator('[data-test="add-to-cart"]');
  }

  async verifyInventoryPageIsVisible() {
    await expect(this.title).toHaveText("Products");
  }

  async verifyProductsAreListed() {
    await expect(this.title).toContainText("Products");
    await expect(this.productList).toBeVisible();
  }

  async verifyProductsHaveNamesAndPrices() {
    const productItems = this.productItems;
    const countItems = await productItems.count();
    expect(countItems).toBeGreaterThan(0);
  }

  async verifyProductNamesAreVisible() {
    const productNames = this.productNames;
    const countNames = await productNames.count();

    for (let i = 0; i < countNames; i++) {
      await expect(productNames.nth(i)).toBeVisible();
    }
  }

  async verifyProductPricesAreVisible() {
    const productPrices = this.productPrices;
    const countPrices = await productPrices.count();

    for (let i = 0; i < countPrices; i++) {
      await expect(productPrices.nth(i)).toBeVisible();
    }
  }

  async addToCart(index: number) {
    await this.addToCartButton.nth(index).click();
  }

  async verifyProductIsAddedToCart(index: number) {
    const removeButton = this.removeCartButton.nth(index);
    await expect(removeButton.nth(index)).toBeVisible();
  }

  async removeProductFromProductsPage(index: number) {
    const removeProduct = this.removeCartButton.nth(index);
    await expect(removeProduct.nth(index)).toBeVisible();
    await removeProduct.click();
  }

  async clickOnProduct() {
    await this.productNames.first().click();
  }

  async verifyProductDetailsOnProductPage() {
    const productImage = this.productDetailsImage;
    await expect(productImage).toBeVisible();
    const productName = this.productDetailsName;
    await expect(productName).toBeVisible();
    const productDescripiton = this.productDetailsDescription;
    await expect(productDescripiton).toBeVisible();
    const productPrice = this.productDetailsPrice;
    await expect(productPrice).toBeVisible();
    const productAddCart = this.productDetailsAddCart;
    await expect(productAddCart).toBeVisible();
  }
}