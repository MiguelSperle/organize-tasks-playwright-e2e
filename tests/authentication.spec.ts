import { test, expect } from '../fixtures';
import { user } from '../data/user';

test.describe('authentication', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onAuthenticationPage().goto();
    });

    for (const value of Object.values(user.credentials.identifiers)) {
        test(`should authenticate successfully using the ${value}`, { tag: '@smoke' }, async ({ pm, page }) => {
            await pm.onAuthenticationPage().authenticate(value, user.credentials.password);

            const cookies = await page.context().cookies();
            const sessionCookie = cookies.find(cookie => cookie.name === 'session-identifier');

            expect(sessionCookie).toBeDefined();

            await expect(page).toHaveURL('/#home');
        });
    };

    test('should display an error when authentication credentials are empty', async ({ pm }) => {
        await pm.onAuthenticationPage().authenticate('', '');

        await expect(pm.onAuthenticationPage().error).toHaveText('Enter your email or username.');
    });

    test('should display an error when authentication password is empty', async ({ pm }) => {
        await pm.onAuthenticationPage().authenticate(user.credentials.identifiers.email, '');

        await expect(pm.onAuthenticationPage().error).toHaveText('Enter a password.');
    });

    test('should display an error when authentication credentials are incorrect', async ({ pm }) => {
        await pm.onAuthenticationPage().authenticate(user.credentials.identifiers.email, 'invalid_password');

        await expect(pm.onAuthenticationPage().error).toHaveText('Incorrect credentials.');
    });
});