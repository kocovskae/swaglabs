Feature: User Login
  As a registered user
  I want to log in to the application
  So that I can access my dashboard

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters "standard_user" as username and "secret_sauce" as password and click on login button
    Then the user should see the dashboard page
