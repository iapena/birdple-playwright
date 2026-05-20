import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { loginData } from './data/loginData';

test.describe('Login Functionality - Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await page.waitForLoadState('domcontentloaded');
        loginPage = new LoginPage(page);
    });

    test('should display login form elements', async ({ page }) => {
        await loginPage.verifyFormElementsVisible();
    });

    test('should display correct placeholder in email input', async ({ page }) => {  
        await loginPage.verifyEmailPlaceholder();
    });

    test('should show error with invalid credentials', async ({ page }) => {

        // Mocking the API response for invalid credentials
        await page.route('https://apidev.birdple.com/api/auth/sign-in', async route => {
            if (route.request().method() === 'POST') {
                console.log('Mock intercepted!');
                await route.fulfill({
                    status: 401,
                    headers: {
                       'content-type': 'application/json;charset=utf-8',
                       'access-control-allow-origin': 'https://dev.birdple.com',
                       'access-control-allow-credentials': 'true',
                    },
                    body: JSON.stringify({ 
                        error: 'Email o contraseña incorrectos',
                        code: 'UNAUTHORIZED' }),
                });
            } else {
                await route.continue();
            }
        });

        await expect( async () => {
            await loginPage.fillEmail(loginData.invalidUser.email);
            await loginPage.fillPassword(loginData.invalidUser.password);
            await loginPage.clickLogin();
            
            await expect(page.getByText(/Email o contraseña incorrectos/i)).toBeVisible();
        }).toPass()
        
        
    });
    


});
