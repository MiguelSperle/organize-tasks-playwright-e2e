import { Locator, Page } from '@playwright/test';

export class TaskManagementPage {
    readonly newTaskButton: Locator;
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly dueDateInput: Locator;
    readonly statusDropdown: Locator;
    readonly createTaskButton: Locator;
    readonly tasks: Locator;

    constructor(readonly page: Page) {
        this.newTaskButton = this.page.getByRole('button', { name: 'New task' })
        this.titleInput = this.page.getByLabel('Title');
        this.descriptionInput = this.page.getByLabel('Description');
        this.dueDateInput = this.page.getByLabel('Due date');
        this.statusDropdown = this.page.getByLabel('Status', { exact: true });
        this.createTaskButton = this.page.getByRole('button', { name: 'Create task' });
        this.tasks = this.page.getByTestId('task-card');
    }

    async goto(): Promise<void> {
        await this.page.goto('/manage-tasks');
    }

    async fillTaskForm(title: string, description: string, dueDate: string, status: string): Promise<void> {
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.dueDateInput.fill(dueDate);
        await this.statusDropdown.selectOption(status);
    }

    async createTask(title: string, description: string, dueDate: string, status: string): Promise<void> {
        await this.newTaskButton.click();
        await this.fillTaskForm(title, description, dueDate, status);
        await this.createTaskButton.click();
    }

    toast(message: string): Locator {
        return this.page.getByText(message);
    }

    taskFilter(title: string): Locator {
        return this.tasks.filter({ hasText: title });
    }
}