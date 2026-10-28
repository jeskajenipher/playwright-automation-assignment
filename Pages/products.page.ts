import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly firstProductOverlay: Locator;
  readonly firstAddToCartBtn: Locator;
  readonly continueShoppingBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.firstProductOverlay = page.locator('.single-products').first();
    this.firstAddToCartBtn = page.locator('.add-to-cart').first();
    this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async searchProduct(name: string) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async addFirstProductToCart() {
    await this.firstProductOverlay.hover();
    await this.firstAddToCartBtn.click();
    await this.continueShoppingBtn.click(); 
  }
}
