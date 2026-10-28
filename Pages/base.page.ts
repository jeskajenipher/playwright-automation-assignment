import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly navSignupLogin: Locator;
  readonly navProducts: Locator;
  readonly navCart: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // 🌟 FIX: Use strict, user-facing role locators to isolate the top navigation links uniquely
    this.navSignupLogin = page.getByRole('link', { name: 'Signup / Login' });
    this.navProducts = page.getByRole('link', { name: 'Products' });
    
    // Scopes directly to the unique 'Cart' link matching the header navigation element
    this.navCart = page.getByRole('listitem').getByRole('link', { name: 'Cart' });
  }

  async navigateTo(path: string = '') {
    await this.page.goto(`https://automationexercise.com${path}`);
  }
}
