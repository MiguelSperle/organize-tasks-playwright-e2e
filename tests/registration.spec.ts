import { test, expect } from '../fixtures';
import { user } from '../data/user';

test.describe('registration', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onRegistrationPage().goto();
    });

    test('should successfully register the user', { tag: '@smoke' }, async ({ pm }) => {
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

    const emptyFields = [
        {
            scenario: 'all empty fields',
            name: '', username: '', email: '', password: '',
            message: 'Please fill in the fields'
        },
        {
            scenario: 'an empty name field',
            name: '',
            username: user.credentials.identifiers.username,
            email: user.credentials.identifiers.email,
            password: user.credentials.password,
            message: 'Enter your name'
        },

        {
            scenario: 'an empty username field',
            name: user.profile.name,
            username: '',
            email: user.credentials.identifiers.email,
            password: user.credentials.password,
            message: 'Enter your username'
        },

        {
            scenario: 'an empty email field',
            name: user.profile.name,
            username: user.credentials.identifiers.username,
            email: '',
            password: user.credentials.password,
            message: 'Enter your email'
        },

        {
            scenario: 'an empty password field',
            name: user.profile.name,
            username: user.credentials.identifiers.username,
            email: user.credentials.identifiers.email,
            password: '',
            message: 'Enter a password'
        }
    ];

    for (const { scenario, name, username, email, password, message } of emptyFields) {
        test(`should display an error when registration has ${scenario}`, async ({ pm }) => {
            await pm.onRegistrationPage().registerUser(name, username, email, password);

            await expect(pm.onRegistrationPage().error).toHaveText(message);
        });
    };

    test('should display an error when registration has an invalid email', async ({ pm }) => {
        await pm.onRegistrationPage().registerUser(
            user.profile.name, user.credentials.identifiers.username,
            'invalid_email', user.credentials.password
        );

        await expect(pm.onRegistrationPage().error).toHaveText('Enter a valid email address');
    });

    test('should display an error when registration has a password shorter than 8 characters', async ({ pm }) => {
        await pm.onRegistrationPage().registerUser(
            user.profile.name, user.credentials.identifiers.username,
            user.credentials.identifiers.email, '1234567'
        );

        await expect(pm.onRegistrationPage().error).toHaveText('Use a password with at least 8 characters');
    });

    test('should display an error when registration data differs from the accepted user data', async ({ pm }) => {
        await pm.onRegistrationPage().registerUser(
            'Some Different Name', 'some.different.username',
            'somedifferentemail@gmail.com', 'somedifferentpassword'
        );

        await expect(pm.onRegistrationPage().error).toHaveText('Only the user data shown below is accepted');
    });
});