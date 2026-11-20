import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
    readonly nameInput: Locator;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly registerButton: Locator;
    readonly successMessage: Locator;

    constructor(readonly page: Page) {
        this.nameInput = this.page.getByLabel('Name', { exact: true });
        this.usernameInput = this.page.getByLabel('Username', { exact: true });
        this.emailInput = this.page.getByLabel('Email', { exact: true });
        this.passwordInput = this.page.getByLabel('Password');
        this.registerButton = this.page.getByRole('button', { name: 'Register' });
        this.successMessage = this.page.getByText('Registered successfully');
    }

    async goto() {
        await this.page.goto('/#register');
    }

    async registerUser(name: string, username: string, email: string, password: string) {
        await this.nameInput.fill(name);
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.registerButton.click();
    }
}