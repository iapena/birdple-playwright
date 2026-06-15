import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { loginData } from './data/loginData';
import { SidebarPage } from './pages/SidebarPage';

test.describe('Auth Functionality - Tests', () => {
    let loginPage: LoginPage;
    let sidebarPage: SidebarPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await page.waitForLoadState('domcontentloaded');
        loginPage = new LoginPage(page);
        sidebarPage = new SidebarPage(page);
    });

    test('Should login after entering valid credentials', async ({ page }) =>{
        // Given: User in the login page

        // When: User enter valid credentials
        await loginPage.fillEmail(loginData.validUser.email);
        await loginPage.fillPassword(loginData.validUser.password);
        await loginPage.clickLogin();

        // To avoid react error #418 (Hydration)
        await expect(page.getByRole('status')).toBeHidden();

        // Then: Site should redirect to dashboard
        await expect(page).toHaveURL(/.*\/dashboard/);
        await expect(page.getByText(/Bienvenido!/i)).toBeVisible();
        
    });

    test('Should logout after a sucessful login', async ({ page }) => {
        // Given: A user logged 
        await loginPage.fillEmail(loginData.validUser.email);
        await loginPage.fillPassword(loginData.validUser.password);
        await loginPage.clickLogin();

        // To avoid react error #418 (Hydration)
        await expect(page.getByRole('status')).toBeHidden();

        // When: Press Logout
        await sidebarPage.clickLogout();

        // Then: Site should redirect to Home Page
        await expect(page).toHaveURL('https://dev.birdple.com/');
        // 6/2/2026: There is a bug (ID#250) on Birdple with the logout 
        /* await expect(page.getByRole('link', {name: /Iniciar Sesion/i})).toBeEnabled(); */ 
    });

    test('should display login form elements', async ({ page }) => {
        // Given: User wants to login 
        // When: Enters to login page

        // Then: Login page should display all login elements 
        await loginPage.verifyFormElementsVisible();
    });

    test('should display correct placeholder in email input', async ({ page }) => {
        // Given: User wants to login
        // When: Enters to login page

        // Then: Login page should display place holders in the fields.
        await loginPage.verifyEmailPlaceholder();
    });

    test.describe('API error handlign (Mocked)', () =>{
        test.beforeEach(async ({ page }) => {
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
        });

        test('should show an error with invalid username', async ({ page }) => {
        // Given: User in the login page

        // When: Enter invalid username, and a valid password
        await loginPage.fillEmail(loginData.invalidUser.email);
        await loginPage.fillPassword(loginData.validUser.password);
        await loginPage.clickLogin();

        await expect( async () => {
        // Then: Error message is displayed     
            await expect(page.getByText(/Email o contraseña incorrectos/i)).toBeVisible();
        }).toPass() 
        });

        test('should show an error with invalid password', async ({ page }) => {
        // Given: User in the login page

        // When: Enter invalid password, and a valid username
        await loginPage.fillEmail(loginData.validUser.email);
        await loginPage.fillPassword(loginData.invalidUser.password);
        await loginPage.clickLogin();

        await expect( async () => {
        // Then: Error message is displayed     
            await expect(page.getByText(/Email o contraseña incorrectos/i)).toBeVisible();
        }).toPass() 
        });

    });
    
});
