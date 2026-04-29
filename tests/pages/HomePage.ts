import { Page } from '@playwright/test';
import { homeLocators } from '../locators/homeLocators';
import { footerLocators } from '../locators/footerLocators';

export class HomePage {
    private page: Page;
    private locators: ReturnType<typeof homeLocators>;
    private footerLocators: ReturnType<typeof footerLocators>;

    constructor(page: Page) {
        this.page = page;
        this.locators = homeLocators(page);
        this.footerLocators = footerLocators(page);
    }

    async clickEvents(): Promise<void> {
        await this.locators.eventsLink.click();
    }

    async clickTournaments(): Promise<void> {
        await this.locators.tournamentsLink.click();
    }

    async clickBazar(): Promise<void> {
        await this.locators.bazarLink.click();
    }
    
    async clickLogin(): Promise<void> {
        await this.locators.loginButton.click();
    }

    async clickThemeButton(): Promise<void> {
        await this.locators.themeButton.click();
    }

    async clickFAQ(): Promise<void> {
        await this.footerLocators.faqlink.click();
    }

    async clickContact(): Promise<void> {
        await this.footerLocators.contactLink.click();
    }

    async clickPrivacy(): Promise<void> {
        await this.footerLocators.privacyLink.click();
    }

    async clickTerms(): Promise<void> {
        await this.footerLocators.termsLink.click();
    }
}