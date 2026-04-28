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
        await page.waitForLoadState('networkidle');

        await page.screenshot({ path: 'debug-events.png' });

        await expect(page).toHaveURL(/.*\/events/);
        await expect(page.getByRole('heading',{name: /Explorar Eventos/i, level: 1})).toBeVisible();

    });

    test('should navigate to Tournaments page', async ({ page }) => {
        await homePage.clickTournaments();
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveURL(/.*\/tournaments/);
        await expect(page.getByRole('heading',{name: /Torneos/i, level: 1})).toBeVisible();
    });
    
    test('should navigate to Bazar page', async ({ page }) => {
        await homePage.clickBazar();
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveURL(/.*\/bazar/);
        await expect(page.getByRole('heading',{name: /Bazar/i, level: 1})).toBeVisible();
    });

    test('should navigate to Login page', async ({ page }) => {
        await homePage.clickLogin();
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveURL(/.*\/login/);
        await expect(page.getByRole('heading',{name: /Iniciar sesión/i, level: 1})).toBeVisible();
    });

    test('should toggle theme', async ({ page }) => {
        //Current theme is light, so actualTheme should be false.
        const actualTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));

        await homePage.clickThemeButton();
        await page.waitForLoadState('networkidle');

        await page.waitForFunction(
            (isDark) => document.documentElement.classList.contains('dark') !== isDark , actualTheme);
        
        const newTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
        expect(newTheme).toBe(!actualTheme);

    }); 

});