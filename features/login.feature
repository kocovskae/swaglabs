Feature: User Login
As a registred user 
I want to login to the application
And see my application dashboard

  Scenario: Succussfull login with valid creadentials
    Given User is on the login page
    When user enter the "standard_user" and "secret_sauce" and click on login button
    Then the user should see the dashboard page
