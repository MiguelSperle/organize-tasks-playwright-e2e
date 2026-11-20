import { Page } from "@playwright/test";
import { AuthenticationPage } from '../authentication-page';
import { RegistrationPage } from '../registration-page';

export class PageManager {
    private readonly authenticationPage: AuthenticationPage;
    private readonly registrationPage: RegistrationPage;

    constructor(private readonly page: Page) {
        this.authenticationPage = new AuthenticationPage(this.page);
        this.registrationPage = new RegistrationPage(this.page);
    }

    onAuthenticationPage(): AuthenticationPage {
        return this.authenticationPage;
    }

    onRegistrationPage(): RegistrationPage {
        return this.registrationPage;
    }
}