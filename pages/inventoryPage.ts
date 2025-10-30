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

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.productList = page.locator('.inventory_list');
    this.productItems = this.productList.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.addToCartButton = page.locator('.btn_inventory');
    this.removeCartButton = page.locator('.btn_secondary');
  }

  async verifyInventoryPageIsVisible(){
    await expect(this.title).toContainText("Products");
  }

  async verifyProductsAreListed(){
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

    for(let i = 0; i < countNames; i++) {
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

async removeFromCart(index: number) {
  const removeProduct = this.removeCartButton.nth(index);
  await expect(removeProduct.nth(index)).toBeVisible();
  await removeProduct.click();
}

}