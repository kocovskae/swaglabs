import { defineConfig, devices } from '@playwright/test';

/**
* @see https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',   // folder where your tests live
  timeout: 30 *1000,    // max time for each test (60s)
  expect: {
    timeout: 5000       // max time for expect() checks
  },
  retries: 1,           // retry failed tests once
  
  reporter: 'html',     
  use: {
    browserName: 'chromium',
    headless: false,
    trace: 'retain-on-failure'
  },

  workers: 4,  // <-- number of parallel workers

});
