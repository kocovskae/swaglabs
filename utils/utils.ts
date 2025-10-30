import {Page} from '@playwright/test'

export async function reloadPage (page: Page) {
    await page.reload();
}