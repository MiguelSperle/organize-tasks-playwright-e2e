import { Page, Locator } from '@playwright/test';

export class AuthenticationPage {
    readonly identifierInput: Locator;
    readonly passwordInput: Locator;
    readonly authenticationButton: Locator;
    readonly error: Locator;

    constructor(readonly page: Page) {
        this.identifierInput = this.page.getByLabel('Email or Username');
        this.passwordInput = this.page.getByLabel('Password', { exact: true });
        this.authenticationButton = this.page.getByRole('button', { name: 'Sign in' });
        this.error = this.page.getByTestId('error');
    }

    async goto() {
        await this.page.goto('/');
    }

    async authenticate(identifier: string, password: string) {
        await this.identifierInput.fill(identifier);
        await this.passwordInput.fill(password);
        await this.authenticationButton.click();
    }
}