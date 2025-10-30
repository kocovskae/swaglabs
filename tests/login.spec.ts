import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

let loginPage: LoginPage;

const dataLogin = [
  { testName: 'Login with valid credentials', username: 'standard_user', password: 'secret_sauce', expected: 'Swag Labs' },
  { testName: 'Login with incorrect password', username: 'standard_user', password: '123456', expected: 'Epic sadface: Username and password do not match any user in this service' },
  { testName: 'Login with incorrect username', username: 'uesr', password: 'secret_sauce', expected: 'Epic sadface: Username and password do not match any user in this service' },
  { testName: 'Login with empty password', username: 'standard_user', password: '', expected: 'Epic sadface: Password is required' },
  { testName: 'Login with empty username', username: '', password: 'secret_sauce', expected: 'Epic sadface: Username is required' },
  { testName: 'Login with empty username and password', username: '', password: '', expected: 'Epic sadface: Username is required' },
  { testName: 'Login with locked out user', username: 'locked_out_user', password: 'secret_sauce', expected: 'Epic sadface: Sorry, this user has been locked out.' },

]

const loginCaseSensitivity = [
  { testName: 'Login with lowercase', username: 'standard_user', password: 'secret_sauce', expected: 'Swag Labs' },
  { testName: 'Login with uppercase', username: 'STANDARD_USER', password: 'SECRET_SAUCE', expected: 'Epic sadface: Username and password do not match any user in this service' },
  { testName: 'Login with mixedcase', username: 'STANDARD_user', password: 'secret_SAUCE', expected: 'Epic sadface: Username and password do not match any user in this service' },
]

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

dataLogin.forEach(({ testName, username, password, expected }) =>
  test(`${testName}`, async ({ page }) => {
    await loginPage.login(username, password);

    if (expected === "Swag Labs") {
      await expect(page).toHaveURL(/inventory.html/);
      await expect(page).toHaveTitle("Swag Labs");
    }
    else {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe(expected);
    }
  }
  )
);

loginCaseSensitivity.forEach(({ testName, username, password, expected }) =>
  test(`${testName}`, async ({ page }) => {
    await loginPage.login(username, password);

    if (expected === "Swag Labs") {
      await expect(page).toHaveURL(/inventory.html/);
      await expect(page).toHaveTitle("Swag Labs");
    }
    else {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe(expected);
    }
  })
)

/*test('User can log in successfully with valid credentials', async ({ page }) => {  //page -> Each test gets a fresh page by default. Playwright handles opening and closing it automatically.
  const username = "standard_user";
  const password = "secret_sauce";

  await loginPage.login(username, password);

  // Example: check if user landed on the dashboard
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page).toHaveTitle("Swag Labs");
});

test('User cannot log in with incorrect password', async ({ page }) => {
  const username = "standard_user";
  const password = "123456";

  await loginPage.login(username, password);

  // Use getErrorMessage() to retrieve the error
  const errorText = await loginPage.getErrorMessage();
  // Assert the error text
  expect(errorText).toBe('Epic sadface: Username and password do not match any user in this service');
});

test('User cannot log in with incorrect username', async ({ page }) => {
  const username = "user";
  const password = "secret_sauce";

  await loginPage.login(username, password);

  // Use getErrorMessage() to retrieve the error
  const errorText = await loginPage.getErrorMessage();
  // Assert the error text
  expect(errorText).toBe('Epic sadface: Username and password do not match any user in this service');
});

test('User cannot login with empty password', async ({ page }) => {
  const username = 'standard_user';
  const password = '';

  await loginPage.login(username, password);

  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toBe('Epic sadface: Password is required');
})

test('User cannot login with empty username', async ({ page }) => {
  const username = '';
  const password = 'secret_sauce';

  await loginPage.login(username, password);

  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toBe('Epic sadface: Username is required');
})

test('Try to login with empty username and password fields', async ({ page }) => {
  const username = "";
  const password = "";

  await loginPage.login(username, password);

  const errorText = await loginPage.getErrorMessage();
  // Assert the error text
  expect(errorText).toBe("Epic sadface: Username is required");
})

test('Try to log in with a locked-out user', async ({ page }) => {
  const username = "locked_out_user";
  const password = "secret_sauce";

  await loginPage.login(username, password);

  const errorText = await loginPage.getErrorMessage();
  // Assert the error text
  expect(errorText).toBe("Epic sadface: Sorry, this user has been locked out.");
})

test('Case-sensitivity login fields check', async ({ page }) => {
  const username = "STANDARD_USER";
  const password = "SECRET_SAUCE";

  await loginPage.login(username, password);

  const errorText = await loginPage.getErrorMessage();
  // Assert the error text
  expect(errorText).toBe("Epic sadface: Username and password do not match any user in this service");
})*/


