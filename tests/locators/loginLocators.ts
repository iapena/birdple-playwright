import { Page } from '@playwright/test';

export const loginLocators = (page: Page) => ({
    
    inputEmail: page.getByRole('textbox', { name: 'email' }),
    inputPassword: page.getByRole('textbox', { name: 'Contraseña' }),
    loginButton: page.getByRole('button', { name: 'Iniciar sesión', exact: true }),
    errorMessage: page.getByText('Email o contraseña incorrectos'),

    forgetPasswordLink:page.getByRole('link', { name: '¿Olvidaste tu contraseña?' }),
    googleLoginButton: page.getByRole('button', { name: 'Iniciar sesión con Google' }),
    registerLink: page.getByRole('link', { name: 'Regístrate' }),

    placeholderEmail: page.getByPlaceholder('tu@email.com'),
});