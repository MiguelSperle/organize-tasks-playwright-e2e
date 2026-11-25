import { test, expect } from '../fixtures';
import { AUTH_STATE_PATH } from '../constants';
import { tasks } from '../data/tasks';

test.use({ storageState: AUTH_STATE_PATH });

test.describe('task management', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onTaskManagementPage().goto();
    });

    test('should successfully create a task', { tag: '@smoke' }, async ({ pm }) => {
        await pm.onTaskManagementPage().createTask(
            tasks[0].title, tasks[0].description, tasks[0].dueDate, tasks[0].status
        );

        await expect(pm.onTaskManagementPage().tasks).toHaveCount(1);
        await expect(pm.onTaskManagementPage().toast('Task created')).toBeVisible();
    });
});