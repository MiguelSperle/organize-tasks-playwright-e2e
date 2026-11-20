import { Page, Locator } from '@playwright/test';

export class AuthenticationPage {
    readonly identifierInput: Locator;
    readonly passwordInput: Locator;
    readonly authenticateButton: Locator;
    readonly error: Locator;

    constructor(readonly page: Page) {
        this.identifierInput = this.page.getByLabel('Email or Username');
        this.passwordInput = this.page.getByLabel('Password');
        this.authenticateButton = this.page.getByRole('button', { name: 'Authenticate' });
        this.error = this.page.getByTestId('auth-error-message');
    }

    async goto() {
        await this.page.goto('/');
    }

    async authenticateUser(identifier: string, password: string) {
        await this.identifierInput.fill(identifier);
        await this.passwordInput.fill(password);
        await this.authenticateButton.click();
    }
}