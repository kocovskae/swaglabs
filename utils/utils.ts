import { Page, expect } from '@playwright/test'

export async function reloadPage(page: Page) {
    await page.reload();
}


export async function verifyUrl(page: Page, expectedUrl: string | RegExp) {
    await expect(page).toHaveURL(expectedUrl);
}

export async function fillForm(page: Page, fields: { locator: string, value: string }[]) {
    for (const field of fields) {
        await page.locator(field.locator).fill(field.value);
    }
}