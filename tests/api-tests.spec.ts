import { test, expect } from '@playwright/test';

test.describe('Automation Exercise REST API Validation Engine', () => {
  test.describe.configure({ mode: 'serial' });

  const baseApiUrl = 'https://www.automationexercise.com/api';
  const testUserEmail = `api_engine_suite_${Date.now()}@mail.com`;
  const defaultPassword = 'EnginePassWord1!';

  const standardHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*'
  };

  const parseSafeJson = (text: string, endpointName: string) => {
    const trimmed = text.trim();
    if (trimmed.startsWith('<')) {
      console.error(`\n[DIAGNOSTIC] ${endpointName} returned HTML instead of JSON! First 300 chars:`);
      console.error(trimmed.substring(0, 300));
      return { responseCode: 500, message: "Server returned HTML instead of JSON" };
    }
    return JSON.parse(text);
  };

  test('API 1: Get All Products List', async ({ request }) => {
    const response = await request.get(`${baseApiUrl}/productsList`, { headers: standardHeaders });
    expect(response.status()).toBe(200);
    
    const text = await response.text();
    const body = parseSafeJson(text, 'API 1 (productsList)');
    
    expect(body.responseCode).toBe(200);
    expect(body).toHaveProperty('products');
  });

  test('API 5: Post/Search Product', async ({ request }) => {
    const response = await request.post(`${baseApiUrl}/searchProduct`, {
      headers: standardHeaders,
      form: { search_product: 'tshirt' }
    });
    expect(response.status()).toBe(200);
    
    const text = await response.text();
    const body = parseSafeJson(text, 'API 5 (searchProduct)');
    expect(body.responseCode).toBe(200);
  });

  test('API 11: Create User Account', async ({ request }) => {
    const response = await request.post(`${baseApiUrl}/createAccount`, {
      headers: standardHeaders,
      form: { 
        name: 'API Engine Automation', 
        email: testUserEmail, 
        password: defaultPassword, 
        title: 'Mr', 
        birth_date: '15', 
        birth_month: '08', 
        birth_year: '1995', 
        firstname: 'API', 
        lastname: 'Automation',
        company: 'QA Corp',
        address1: '123 Test St',
        country: 'United States',
        zipcode: '12345',
        state: 'Texas',
        city: 'Austin',
        mobile_number: '1234567890'
      }
    });
    expect(response.status()).toBe(200);
    
    const text = await response.text();
    const body = parseSafeJson(text, 'API 11 (createAccount)');
    expect(body.responseCode).toBe(201);
  });

  test('API 7: Verify Login', async ({ request }) => {
    const response = await request.post(`${baseApiUrl}/verifyLogin`, {
      headers: standardHeaders,
      form: { email: testUserEmail, password: defaultPassword }
    });
    expect(response.status()).toBe(200);
    
    const text = await response.text();
    const body = parseSafeJson(text, 'API 7 (verifyLogin)');
    expect(body.responseCode).toBe(200);
  });

  test('API 12: Delete Account', async ({ request }) => {
    const response = await request.delete(`${baseApiUrl}/deleteAccount`, {
      headers: standardHeaders,
      form: { email: testUserEmail, password: defaultPassword }
    });
    expect(response.status()).toBe(200);
    
    const text = await response.text();
    const body = parseSafeJson(text, 'API 12 (deleteAccount)');
    expect(body.responseCode).toBe(200);
  });
});
