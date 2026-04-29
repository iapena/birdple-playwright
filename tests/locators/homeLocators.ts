import { Page } from "@playwright/test";

export const homeLocators = (page: Page) => ({
    eventsLink: page.getByRole('link', { name: 'Eventos' }),
    tournamentsLink: page.getByRole('link', {name: 'Torneos'}),
    bazarLink: page.getByRole('link', {name: 'Bazar'}),
    loginButton: page.getByRole('link', {name: 'Iniciar sesión'}),
    themeButton: page.getByRole('button', {name: 'Click to change'}),

})