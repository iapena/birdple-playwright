export const loginData = {
    validUser: {
        email: process.env.TEST_EMAIL || '',
        password: process.env.TEST_PASSWORD || '',
    },
    invalidUser: {
        email: 'invalid@gmail.com',
        password: 'wrongpassword',
    },
};