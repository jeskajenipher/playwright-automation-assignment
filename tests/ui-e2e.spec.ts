import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';

test.describe('E2E E-Commerce User Flows', () => {
  let uniqueEmail: string;

  test.beforeEach(() => {
    uniqueEmail = `playwright_user_${Date.now()}@mail.com`;
  });

  test('E2E: Dynamic User Lifecycle - Signup, Login, Purchase & Verification', async ({ page }) => {
    const authPage = new AuthPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await authPage.navigateTo('/login');
    await authPage.initiateSignup('UI Tester', uniqueEmail);
    await authPage.completeRegistration('SecurePass123!');
    await expect(authPage.accountCreatedHeader).toBeVisible();

    await page.locator('[data-qa="continue-button"]').click();

    await page.getByRole('link', { name: 'Logout' }).click();

    await authPage.navigateTo('/login');
    await authPage.login(uniqueEmail, 'WrongPassword!');
    await expect(authPage.loginErrorMsg).toContainText('Your email or password is incorrect!');

    await authPage.login(uniqueEmail, 'SecurePass123!');
    await expect(page.locator('text=Logged in as UI Tester')).toBeVisible();

    await productsPage.navProducts.click();
    await productsPage.searchProduct('tshirt');
    await productsPage.addFirstProductToCart();

    await productsPage.navCart.click();
    await cartPage.checkoutAndPlaceOrder('Automated purchase via Playwright execution framework.');
    await cartPage.submitPayment();
    await expect(cartPage.orderSuccessMsg).toBeVisible();
  });
});
