import { Page } from '@playwright/test';

export const loginLocators = (page: Page) => ({
    
    inputEmail: page.getByRole('textbox', { name: 'email' }),
    inputPassword: page.getByRole('textbox', { name: 'Contraseña' }),
    loginButton: page.getByRole('button', { name: 'Iniciar sesión', exact: true }),
    errorMessage: page.getByText('Email o contraseña incorrectos'),

    forgetPasswordLink:page.getByRole('link', { name: '¿Olvidaste tu contraseña?' }),
    email_forgotpassword: page.getByRole('textbox', {name: 'Correo electrónico'}),
    sendCode_forgotpassword: page.getByRole('button', {name: 'Enviar código'}),
    returnLogin_forgotpassword: page.getByRole('button', {name: 'Volver al inicio de sesión'}),
    haveCode_forgotpassword: page.getByRole('button', {name: 'Tengo el código, continuar'}),
    otherEmail_forgotpassword: page.getByRole('button', {name: 'Probar con otro correo'}),


    googleLoginButton: page.getByRole('button', { name: 'Iniciar sesión con Google' }),
    registerLink: page.getByRole('link', { name: 'Regístrate' }),

    placeholderEmail: page.getByPlaceholder('tu@email.com'),
});