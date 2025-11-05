import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly checkoutBtn;
    readonly firstNameField;
    readonly lastNameField;
    readonly postalCodeField;
    readonly cancelButton;
    readonly continueButton;
    readonly orderSummaryInfo;
    readonly orderSummaryValue;
    readonly summarySubtotal;
    readonly summaryTax;
    readonly summaryTotal;
    readonly finishButton;
    readonly paymentSuccessMessage;

    constructor(page: Page) {
        this.page = page;
        this.checkoutBtn = page.locator("#checkout");
        this.firstNameField = page.locator("#first-name");
        this.lastNameField = page.locator("#last-name");
        this.postalCodeField = page.locator("#postal-code");
        this.cancelButton = page.locator("#cancel");
        this.continueButton = page.locator("#continue");
        this.orderSummaryInfo = page.locator(".summary_info_label");
        this.orderSummaryValue = page.locator(".summary_value_label");
        this.summarySubtotal = page.locator(".summary_subtotal_label");
        this.summaryTax = page.locator(".summary_tax_label");
        this.summaryTotal = page.locator(".summary_total_label");
        this.finishButton = page.locator("#finish");
        this.paymentSuccessMessage = page.locator(".complete-header", { hasText: "Thank you for your order!" });
    }

    async clickOnCheckoutButton() {
        await this.checkoutBtn.click();
    }

    async verifyCheckoutFormIsVisible() {
        await expect(this.firstNameField).toBeVisible();
        await expect(this.lastNameField).toBeVisible();
        await expect(this.postalCodeField).toBeVisible();
    }

    async verifyCancelButtonIsVisible() {
        await expect(this.cancelButton).toBeVisible();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async verifyContinueButtonIsVisible() {
        await expect(this.continueButton).toBeVisible();
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }

    async verifyPaymentOrderDetails(index: number, text: string, value: number, patternMatch: RegExp) {
        await expect(this.orderSummaryInfo.nth(index)).toHaveText(text)
        const paymentValue = await this.orderSummaryValue.nth(value).innerText();
        expect(paymentValue).toMatch(patternMatch);
    }

    async verifyPriceTotals(itemTotalMatch: RegExp, itemTaxMatch: RegExp, sumTotalMatch: RegExp) {
        await expect(this.orderSummaryInfo.filter({ hasText: "Price Total" })).toBeVisible();
        const itemTotal = await this.summarySubtotal.textContent();
        expect(itemTotal).toMatch(itemTotalMatch);
        const itemTax = await this.summaryTax.textContent();
        expect(itemTax).toMatch(itemTaxMatch);
        const totalPrice = await this.summaryTotal.textContent();
        expect(totalPrice).toMatch(sumTotalMatch);
    }

    async verifySuccessfullPaymentMessage() {
        const successfulPaymentMsg = this.paymentSuccessMessage;
        await expect(successfulPaymentMsg).toBeVisible();
    }


};