import { test, expect } from '../fixtures';
import { user } from '../data/user';

test.describe('registration', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onRegistrationPage().goto();
    });

    test('should successfully register the user', async ({ pm }) => {
        await pm.onRegistrationPage().registerUser(
            user.profile.name, user.credentials.identifiers.username,
            user.credentials.identifiers.email, user.credentials.password
        );

        await expect(pm.onRegistrationPage().successMessage).toBeVisible();
        await expect(pm.onRegistrationPage().nameInput).toBeEmpty();
        await expect(pm.onRegistrationPage().usernameInput).toBeEmpty();
        await expect(pm.onRegistrationPage().emailInput).toBeEmpty();
        await expect(pm.onRegistrationPage().passwordInput).toBeEmpty();
    });
});