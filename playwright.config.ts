import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, /* Run tests in files in parallel */
  forbidOnly: !!process.env.CI, /* Fail the build on CI if you accidentally left test.only in the source code */
  retries: process.env.CI ? 2 : 0, /* Retry on CI only */
  workers: process.env.CI ? 1 : undefined,   /* Opt out of parallel tests on CI. */
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts'
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup']
    }
  ]
});