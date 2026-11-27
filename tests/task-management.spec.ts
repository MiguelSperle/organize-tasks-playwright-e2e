import { test, expect } from '../fixtures';
import { AUTH_STATE_PATH } from '../constants';
import { tasks } from '../data/tasks';
import { TaskStatus } from '../data/tasks';
import { Locator } from '@playwright/test';

type TaskUpdateValues = {
    newTitle: string;
    newDescription: string;
    newDueDate: string;
    newStatus: TaskStatus;
};

type SingleFieldTaskUpdate = {
    field: string;
    changes: Partial<TaskUpdateValues>;
};

test.use({ storageState: AUTH_STATE_PATH });

test.describe('task management', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onTaskManagementPage().goto();
    });

    test('should successfully create a task', { tag: '@smoke' }, async ({ pm }) => {
        await pm.onTaskManagementPage().createTask(
            tasks[0].title, tasks[0].description, tasks[0].dueDate, tasks[0].status
        );

        await expect(pm.onTaskManagementPage().toast('Task created')).toBeVisible();
        await expect(pm.onTaskManagementPage().taskFilter(tasks[0].title)).toHaveCount(1);
    });

    test('should successfully update an entire task', async ({ pm, taskInStorage }) => {
        const entireTaskUpdate: TaskUpdateValues = {
            newTitle: 'Write Portuguese Abstract',
            newDescription: 'Create a 200-word summary of the research paper in Portuguese',
            newDueDate: '2027-03-03',
            newStatus: 'In progress'
        };

        await pm.onTaskManagementPage().updateTask(tasks[0].title, {
            newTitle: entireTaskUpdate.newTitle,
            newDescription: entireTaskUpdate.newDescription,
            newDueDate: entireTaskUpdate.newDueDate,
            newStatus: entireTaskUpdate.newStatus
        });

        await expect(pm.onTaskManagementPage().toast('Task updated')).toBeVisible();

        const updatedTask: Locator = pm.onTaskManagementPage().taskFilter(entireTaskUpdate.newTitle);

        await expect(updatedTask).toBeVisible();
        await expect(updatedTask.getByTestId('task-description')).toContainText(entireTaskUpdate.newDescription)

        const [year, month, day] = entireTaskUpdate.newDueDate.split('-');
        const formattedDueDate = `${day}/${month}/${year}`;

        await expect(updatedTask).toContainText(formattedDueDate);
        await expect(updatedTask).toContainText(entireTaskUpdate.newStatus);
    });
});