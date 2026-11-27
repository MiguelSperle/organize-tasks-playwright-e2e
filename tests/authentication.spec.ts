import { test, expect } from '../fixtures';
import { user } from '../data/user';

type AuthenticationCredentialsWithScenario = {
    scenario: string;
    identifier: string;
    password: string;
};

type EmptyAuthenticationField = AuthenticationCredentialsWithScenario & {
    message: string;
};

test.describe('authentication', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onAuthenticationPage().goto();
    });

    const identifiers: string[] = Object.values(user.credentials.identifiers);

    for (const identifier of identifiers) {
        test(`should successfully authenticate the user using ${identifier}`, { tag: '@smoke' }, async ({ pm, page }) => {
            await pm.onAuthenticationPage().authenticateUser(identifier, user.credentials.password);

            const cookies = await page.context().cookies();
            const sessionCookie = cookies.find(cookie => cookie.name === 'session-identifier');

            expect(sessionCookie).toBeDefined();

            await expect(page).toHaveURL('/manage-tasks');
        });
    }

    const emptyAuthenticationFields: EmptyAuthenticationField[] = [
        { scenario: 'all empty fields', identifier: '', password: '', message: 'Please fill in the fields' },
        { scenario: 'an empty identifier field', identifier: '', password: user.credentials.password, message: 'Enter your email or username' },
        { scenario: 'an empty password field', identifier: user.credentials.identifiers.email, password: '', message: 'Enter a password' },
    ];

    for (const { scenario, identifier, password, message } of emptyAuthenticationFields) {
        test(`should display an error when authentication has ${scenario}`, async ({ pm }) => {
            await pm.onAuthenticationPage().authenticateUser(identifier, password);

            await expect(pm.onAuthenticationPage().errorMessage).toHaveText(message);
        });
    }

    const incorrectAuthenticationCredentials: AuthenticationCredentialsWithScenario[] = [
        { scenario: 'an incorrect password', identifier: user.credentials.identifiers.email, password: 'incorrect_password' },
        { scenario: 'an incorrect identifier', identifier: 'incorrect_identifier', password: user.credentials.password },
        { scenario: 'an incorrect identifier and password', identifier: 'incorrect_identifier', password: 'incorrect_password' }
    ];

    for (const { scenario, identifier, password } of incorrectAuthenticationCredentials) {
        test(`should display an error when authentication has ${scenario}`, async ({ pm }) => {
            await pm.onAuthenticationPage().authenticateUser(identifier, password);

            await expect(pm.onAuthenticationPage().errorMessage).toHaveText('Incorrect credentials');
        });
    }
});