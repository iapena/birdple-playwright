import { Page, expect } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';

export class LoginPage {
    private page: Page;
    private loginlocators: ReturnType<typeof loginLocators>;

    constructor(page: Page) {
        this.page = page;
        this.loginlocators = loginLocators(page);
    }

    async fillEmail(email: string): Promise<void> {
        await this.loginlocators.inputEmail.waitFor({ state: 'visible' });
        /* await expect(this.loginlocators.inputEmail).toBeEditable(); */
        await this.loginlocators.inputEmail.click();
        await this.loginlocators.inputEmail.pressSequentially(email);
        /* await expect(this.loginlocators.inputEmail).toHaveValue(email); */
    }
    
    async fillPassword(password: string): Promise<void> {
        await this.loginlocators.inputPassword.waitFor({ state: 'visible' });
        /* await expect(this.loginlocators.inputPassword).toBeEditable(); */
        await this.loginlocators.inputPassword.click();
        await this.loginlocators.inputPassword.pressSequentially(password);
        /* await expect(this.loginlocators.inputPassword).toHaveValue(password); */
    }

    async forgetPassword(): Promise<void> {
        await this.loginlocators.forgetPasswordLink.click();
    }
    
    async clickLogin(): Promise<void> {
        /* await expect(this.loginlocators.loginButton).toBeEnabled(); */
        await this.loginlocators.loginButton.waitFor({ state: 'visible'})
        await this.loginlocators.loginButton.click();
    }

/*     async login(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
    } */

    async clickRegister(): Promise<void> {
        await this.loginlocators.registerLink.click();
    }

    async clickGoogleLogin(): Promise<void> {
        await this.loginlocators.googleLoginButton.click();
    }

    async verifyFormElementsVisible(): Promise<void> {
        await expect(this.loginlocators.inputEmail).toBeVisible();
        await expect(this.loginlocators.inputPassword).toBeVisible();
        await expect(this.loginlocators.loginButton).toBeVisible();
        await expect(this.loginlocators.forgetPasswordLink).toBeVisible();
        await expect(this.loginlocators.googleLoginButton).toBeVisible();
        await expect(this.loginlocators.registerLink).toBeVisible();
    }

    async verifyEmailPlaceholder(): Promise<void> {
        await expect(this.loginlocators.placeholderEmail).toBeVisible();
    }

}