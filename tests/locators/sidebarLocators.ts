import { Page } from "@playwright/test";

export const sidebarLocators = (page: Page) => ({

    logout: page.getByRole('button', {name: /Cerrar sesión/i})

})