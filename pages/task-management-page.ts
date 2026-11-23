import { Page } from '@playwright/test';

export class TaskManagementPage {

    constructor(readonly page: Page) {
    }

    async goto() {
        await this.page.goto('/manage-tasks');
    }
}