import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import CreateAccount from "../../pages/createAccount.js";
import Home from "../../pages/Home.js";
import { faker } from "@faker-js/faker";

Given("User open the home page", () => {
  cy.task(
    "log",
    "\n\n    Running scenario: " + window.testState.currentScenario.name
  );
  Home.visit();
});

Given("User click join button to access JOIN page", () => {
  Home.visitJoinPage();
});

Then(
  "User see the email address, Join button, already member message and create account link",
  () => {
    CreateAccount.checkEmailFieldVisibility();
    CreateAccount.checkEmailErrorMessage("Please enter your email address");
  }
);

Then("User can not see other fields e.g. password, FirstNames etc.", () => {
  CreateAccount.checkOtherFieldsInvisibility();
});

Then("User can see term and condition", () => {
  //TODO: develop term and condition
});

When("User input email with {string}", (email) => {
  CreateAccount.fillEmail(email);
});

When("User input new email - not existing in current system", () => {
  const email = faker.internet.email();
  CreateAccount.fillEmail(
    (Math.floor(Math.random() * 10000) + 1).toString() + email
  );
});

Then(
  "User should see the password error message with {string}",
  (password_error_message) => {
    CreateAccount.checkPasswordErrorMessage(password_error_message);
  }
);

Then(
  "User should see the error message with {string}",
  (email_error_message) => {
    CreateAccount.checkEmailErrorMessage(email_error_message);
  }
);

When("User press Join button", () => {
  CreateAccount.clickJoinButton();
});

When("User input password with {string}", (passwords) => {
  CreateAccount.fillPassword(passwords);
});

When("User input first name with {string}", (firstName) => {
  CreateAccount.fillFirstName(firstName);
});

When("User input last name with {string}", (lastName) => {
  CreateAccount.fillLastName(lastName);
});

When("User input mobile number with {string}", (mobilePhone) => {
  CreateAccount.fillMobilePhone(mobilePhone);
});

When("User input Date of Birth with {string}", (dateOfBirth) => {
  CreateAccount.fillDateOfBirth(dateOfBirth);
});

When("User input Address with {string}", (address) => {
  CreateAccount.fillAddress(address);
});

When("User press Create Account button", () => {
  CreateAccount.clickCreateAccountButton();
});

Then("User should see access to the Account page", () => {
  CreateAccount.verifyCurrentAccountURL();
});

Then(
  "User should see the error message for {string} with text {string}",
  (field, expectedErrorMessage) => {
    CreateAccount.checkErrorMessages(field, expectedErrorMessage);
  }
);
