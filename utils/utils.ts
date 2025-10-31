import { Page, expect } from '@playwright/test'

export async function reloadPage(page: Page) {
    await page.reload();
}


export async function verifyUrl(page: Page, expectedUrl: string | RegExp) {
    await expect(page).toHaveURL(expectedUrl);
}