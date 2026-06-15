import { Page, expect } from '@playwright/test';
import { sidebarLocators } from '../locators/sidebarLocators';

export class SidebarPage {
    private page: Page;
    private sidebarlocators: ReturnType<typeof sidebarLocators>;

    constructor(page: Page) {
        this.page = page;
        this.sidebarlocators = sidebarLocators(page);
    }

    async clickLogout(): Promise<void> {
        await this.sidebarlocators.logout.waitFor({ state: 'visible'})
        await this.sidebarlocators.logout.click();
    }

}