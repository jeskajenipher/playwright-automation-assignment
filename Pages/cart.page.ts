import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly proceedToCheckoutBtn: Locator;
  readonly placeOrderBtn: Locator;
  readonly commentTextArea: Locator;
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cvc: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly payAndConfirmBtn: Locator;
  readonly orderSuccessMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.proceedToCheckoutBtn = page.locator('.check_out');
    this.placeOrderBtn = page.locator('a[href="/payment"]');
    this.commentTextArea = page.locator('textarea[name="message"]');
    this.nameOnCard = page.locator('[data-qa="name-on-card"]');
    this.cardNumber = page.locator('[data-qa="card-number"]');
    this.cvc = page.locator('[data-qa="cvc"]');
    this.expiryMonth = page.locator('[data-qa="expiry-month"]');
    this.expiryYear = page.locator('[data-qa="expiry-year"]');
    this.payAndConfirmBtn = page.locator('[data-qa="pay-button"]');
    this.orderSuccessMsg = page.locator('[data-qa="order-placed"]');
  }

  async checkoutAndPlaceOrder(notes: string) {
    await this.proceedToCheckoutBtn.click();
    await this.commentTextArea.fill(notes);
    await this.placeOrderBtn.click();
  }

  async submitPayment() {
    await this.nameOnCard.fill('QA Tester');
    await this.cardNumber.fill('4111111111111111');
    await this.cvc.fill('123');
    await this.expiryMonth.fill('12');
    await this.expiryYear.fill('2030');
    await this.payAndConfirmBtn.click();
  }
}

