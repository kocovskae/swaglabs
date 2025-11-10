import { InventoryPage } from './inventoryPage';
import { Page, expect } from '@playwright/test';
import { reloadPage } from '../utils/utils';

export class FilterPage {
    readonly page: Page;
    readonly inventoryPage: InventoryPage;
    readonly selectDropdown;
    readonly selectFilter;

    constructor(page: Page) {
        this.page = page;
        this.inventoryPage = new InventoryPage(page);
        this.selectDropdown = this.page.locator('[data-test="product-sort-container"]');
        this.selectFilter = this.page.locator('[data-test="product-sort-container"] option:checked');
    }

    async selectFilterOption(value: string) {
        await this.selectDropdown.selectOption(value);
    }

    async getProductsNamesByAscOrder() {
        const productNames = await this.inventoryPage.productNames.allInnerTexts();
        //check that products are listed by default filter A to Z
        const defaultSort = [...productNames].sort();
        expect(productNames).toEqual(defaultSort);
    }

    async getProductsNamesByDescOrder() {
        const productNames = await this.inventoryPage.productNames.allInnerTexts();
        //[ ...productNames ] creates a new array with the same elements.
        const descSort = [...productNames].sort((a, z) => z.localeCompare(a));
        expect(productNames).toEqual(descSort);
    }

    async getProductsByLowestPrice() {
        // Get numeric product prices
        const productPrices = (await this.inventoryPage.productPrices.allInnerTexts())
            //p → each element of the array (each price string, e.g., "$29.99").
            //p.replace('$', '') → removes the $ symbol → "29.99".
            //parseFloat(...) → converts the string "29.99" into the number 29.99.
            .map(p => parseFloat(p.replace('$', '')));
        // Create expected low → high order
        const lowPriceSort = [...productPrices].sort((a, b) => a - b);
        // Verify UI order
        expect(productPrices).toEqual(lowPriceSort);
    }

    async getProductsByHighestPrice() {
        const productPrices = (await this.inventoryPage.productPrices.allInnerTexts())
            .map(p => parseFloat(p.replace('$', '')));
        const highPriceSort = [...productPrices].sort((a, b) => b - a);
        expect(productPrices).toEqual(highPriceSort);
    }

    async verifyFilterResetsToDefault() {
        // Refresh the page
        await reloadPage(this.page);
        // Verify the selected filter is back to default
        const selectedFilter = await this.selectFilter.textContent();
        expect(selectedFilter?.trim()).toBe('Name (A to Z)');
    }
}