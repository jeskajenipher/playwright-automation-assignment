import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AuthPage extends BasePage {
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly loginErrorMsg: Locator;

  // Registration Form
  readonly genderMrRadio: Locator;
  readonly passwordInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileInput: Locator;
  readonly createAccountBtn: Locator;
  readonly accountCreatedHeader: Locator;

  constructor(page: Page) {
    super(page);
    // 🌟 Change all 'self.' to 'this.' inside the constructor
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.loginErrorMsg = page.locator('p[style*="color: red"]');

    this.genderMrRadio = page.locator('#id_gender1');
    this.passwordInput = page.locator('#password');
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.addressInput = page.locator('#address1');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileInput = page.locator('#mobile_number');
    this.createAccountBtn = page.locator('[data-qa="create-account"]');
    this.accountCreatedHeader = page.locator('[data-qa="account-created"]');
  }

  async login(email: string, pass: string) {
    // 🌟 Change 'self.' to 'this.' here
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(pass);
    await this.loginButton.click();
  }

  async initiateSignup(name: string, email: string) {
    // 🌟 Change 'self.' to 'this.' here
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async completeRegistration(password: string) {
    // 🌟 Change 'self.' to 'this.' here
    await this.genderMrRadio.click();
    await this.passwordInput.fill(password);
    await this.firstNameInput.fill('QA');
    await this.lastNameInput.fill('Engineer');
    await this.addressInput.fill('123 Test Street');
    await this.countrySelect.selectOption('United States');
    await this.stateInput.fill('Texas');
    await this.cityInput.fill('Austin');
    await this.zipcodeInput.fill('73301');
    await this.mobileInput.fill('1234567890');
    await this.createAccountBtn.click();
  }
}
