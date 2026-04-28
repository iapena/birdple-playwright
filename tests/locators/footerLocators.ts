import { Page } from '@playwright/test';

export const footerLocators = (page: Page) => ({
    faqlink: page.getByRole('link', {name: 'FAQ'}),
    contactLink: page.getByRole('link', {name: 'Contacto'}),
    privacyLink: page.getByRole('link', {name: 'Privacidad'}),
    termsLink: page.getByRole('link', {name: 'Términos'}),
})