import { test, expect } from '../fixtures';
import { user } from '../data/user';
import { Cookie } from '@playwright/test';

test.describe('authentication', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onAuthenticationPage().goto();
    });

    const identifiers: string[] = Object.values(user.credentials.identifier);

    for (const value of identifiers) {
        test(`should authenticate successfully using the ${value}`, { tag: '@smoke' }, async ({ pm, page }) => {
            await pm.onAuthenticationPage().authenticate(value, user.credentials.password);

            const cookies: Cookie[] = await page.context().cookies();
            const sessionCookie = cookies.find(cookie => cookie.name === 'session-identifier');

            expect(sessionCookie).toBeDefined();

            await expect(page).toHaveURL('/#home');
        });
    };
});