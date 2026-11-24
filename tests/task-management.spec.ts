import { test, expect } from '../fixtures';

test.describe('task management', () => {
    test.beforeEach(async ({ pm }) => {
        await pm.onTaskManagementPage().goto();
    });
});