import { Page, Locator } from '@playwright/test';

export class AuthenticationPage {
    readonly identifierInput: Locator;
    readonly passwordInput: Locator;
    readonly authenticateButton: Locator;
    readonly errorMessage: Locator;

    constructor(readonly page: Page) {
        this.identifierInput = this.page.getByLabel('Email or Username');
        this.passwordInput = this.page.getByLabel('Password');
        this.authenticateButton = this.page.getByRole('button', { name: 'Authenticate' });
        this.errorMessage = this.page.getByTestId('authentication-error-message');
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async authenticateUser(identifier: string, password: string): Promise<void> {
        await this.identifierInput.fill(identifier);
        await this.passwordInput.fill(password);
        await this.authenticateButton.click();
    }
}