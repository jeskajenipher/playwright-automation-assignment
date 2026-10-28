import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly navSignupLogin: Locator;
  readonly navProducts: Locator;
  readonly navCart: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.navSignupLogin = page.getByRole('link', { name: 'Signup / Login' });
    this.navProducts = page.getByRole('link', { name: 'Products' });
    
    this.navCart = page.getByRole('listitem').getByRole('link', { name: 'Cart' });
  }

  async navigateTo(path: string = '') {
    await this.page.goto(`https://automationexercise.com${path}`);
  }
}
