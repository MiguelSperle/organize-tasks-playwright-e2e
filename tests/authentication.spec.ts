import { test, expect } from '../fixtures';
import { user } from '../data/user';

test.describe('authentication', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onAuthenticationPage().goto();
    });

    const identifiers = Object.values(user.credentials.identifiers);

    for (const identifier of identifiers) {
        test(`should authenticate successfully using the ${identifier}`, { tag: '@smoke' }, async ({ pm, page }) => {
            await pm.onAuthenticationPage().authenticate(identifier, user.credentials.password);

            const cookies = await page.context().cookies();
            const sessionCookie = cookies.find(cookie => cookie.name === 'session-identifier');

            expect(sessionCookie).toBeDefined();

            await expect(page).toHaveURL('/#home');
        });
    };

    const emptyCredentials = [
        { scenario: 'empty credentials', identifier: '', password: '', message: 'Enter your email or username.' },
        { scenario: 'an empty identifier', identifier: '', password: user.credentials.password, message: 'Enter your email or username.' },
        { scenario: 'an empty password', identifier: user.credentials.identifiers.email, password: '', message: 'Enter a password.' },
    ];

    for (const { scenario, identifier, password, message } of emptyCredentials) {
        test(`should display an error when authentication has ${scenario}`, async ({ pm }) => {
            await pm.onAuthenticationPage().authenticate(identifier, password);

            await expect(pm.onAuthenticationPage().error).toHaveText(message);
        });
    };

    const incorrectCredentials = [
        { scenario: 'an invalid password', identifier: user.credentials.identifiers.email, password: 'invalid_password' },
        { scenario: 'an invalid identifier', identifier: 'invalid_identifier', password: user.credentials.password },
        { scenario: 'invalid credentials', identifier: 'invalid_identifier', password: 'invalid_password' }
    ];

    for (const { scenario, identifier, password } of incorrectCredentials) {
        test(`should display an error when authentication has ${scenario}`, async ({ pm }) => {
            await pm.onAuthenticationPage().authenticate(identifier, password);

            await expect(pm.onAuthenticationPage().error).toHaveText('Incorrect credentials.');
        });
    };
});