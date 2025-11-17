import { defineConfig, devices } from '@playwright/test';


/**
* @see https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],

  testDir: './tests',   // folder where your tests live
  globalSetup: './global-setup/globalSetup.ts',  // relative to project root
  timeout: 60 * 1000,    // max time for each test (60s)
  expect: {
    timeout: 5000       // max time for expect() checks
  },
  retries: 1,           // retry failed tests once

  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    storageState: 'storageState.json',
    //browserName: 'chromium',
    headless: false,
    trace: 'retain-on-failure'
  },

  workers: 4,  // <-- number of parallel workers

});
