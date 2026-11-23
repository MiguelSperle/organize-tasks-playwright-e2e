import { Page } from "@playwright/test";
import { AuthenticationPage } from '../authentication-page';
import { RegistrationPage } from '../registration-page';
import { TaskManagementPage } from '../task-management-page';

export class PageManager {
    private readonly authenticationPage: AuthenticationPage;
    private readonly registrationPage: RegistrationPage;
    private readonly taskManagementPage: TaskManagementPage;

    constructor(private readonly page: Page) {
        this.authenticationPage = new AuthenticationPage(this.page);
        this.registrationPage = new RegistrationPage(this.page);
        this.taskManagementPage = new TaskManagementPage(this.page);
    }

    onAuthenticationPage(): AuthenticationPage {
        return this.authenticationPage;
    }

    onRegistrationPage(): RegistrationPage {
        return this.registrationPage;
    }

    onTaskManagementPage(): TaskManagementPage {
        return this.taskManagementPage;
    }
}