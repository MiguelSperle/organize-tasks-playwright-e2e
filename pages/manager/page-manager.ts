import { Page } from "@playwright/test";
import { AuthenticationPage } from '../authentication-page';

export class PageManager {
    private readonly authenticationPage: AuthenticationPage;

    constructor(private readonly page: Page) {
        this.authenticationPage = new AuthenticationPage(this.page);
    }

    onAuthenticationPage(): AuthenticationPage {
        return this.authenticationPage;
    }
}