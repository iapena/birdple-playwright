import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Home Navigation - Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        homePage = new HomePage(page);
    });

    test('should navigate to Events page', async ({ page }) => { 
        await homePage.clickEvents();

        await expect(page).toHaveURL(/.*\/events/);
        await expect(page.getByRole('heading',{name: /Explorar Eventos/i, level: 1})).toBeVisible();

    });

    test('should navigate to Tournaments page', async ({ page }) => {
        await homePage.clickTournaments();

        await expect(page).toHaveURL(/.*\/tournaments/);
        await expect(page.getByRole('heading',{name: /Torneos/i, level: 1})).toBeVisible();
    });
    
    test('should navigate to Bazar page', async ({ page }) => {
        await homePage.clickBazar();

        await expect(page).toHaveURL(/.*\/bazar/);
        await expect(page.getByRole('heading',{name: /Bazar/i, level: 1})).toBeVisible();
    });

    test('should navigate to Login page', async ({ page }) => {
        await homePage.clickLogin();

        await expect(page).toHaveURL(/.*\/login/);
        await expect(page.getByRole('heading',{name: /Iniciar sesión/i, level: 1})).toBeVisible();
    });

    test('should toggle theme', async ({ page }) => {
        //get the current theme
        const actualTheme = await page.evaluate(() => document.documentElement.classList.contains('light'));

        await homePage.clickThemeButton();
        await expect(page.evaluate(() => document.documentElement.classList.contains('dark'))).resolves.toBe(!actualTheme);

    }); 

});