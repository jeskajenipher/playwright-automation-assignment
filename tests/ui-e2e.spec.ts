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

    // 1. New User Registration
    await authPage.navigateTo('/login');
    await authPage.initiateSignup('UI Tester', uniqueEmail);
    await authPage.completeRegistration('SecurePass123!');
    await expect(authPage.accountCreatedHeader).toBeVisible();

    // 🌟 STABILITY STEP: Click the 'Continue' button on the Account Created landing card first
    await page.locator('[data-qa="continue-button"]').click();

    // 2. Clear Session State by logging out using a highly resilient visible text locator
    await page.getByRole('link', { name: 'Logout' }).click();

    // 3. Test Invalid Login validation
    await authPage.navigateTo('/login');
    await authPage.login(uniqueEmail, 'WrongPassword!');
    await expect(authPage.loginErrorMsg).toContainText('Your email or password is incorrect!');

    // 4. Valid Login Verification
    await authPage.login(uniqueEmail, 'SecurePass123!');
    await expect(page.locator('text=Logged in as UI Tester')).toBeVisible();

    // 5. Dynamic Product Search & E-Commerce Cart Add
    await productsPage.navProducts.click();
    await productsPage.searchProduct('tshirt');
    await productsPage.addFirstProductToCart();

    // 6. Checkout Process & Order Submission
    await productsPage.navCart.click();
    await cartPage.checkoutAndPlaceOrder('Automated purchase via Playwright execution framework.');
    await cartPage.submitPayment();
    await expect(cartPage.orderSuccessMsg).toBeVisible();
  });
});
