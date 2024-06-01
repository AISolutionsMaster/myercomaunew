import {
  EMAIL_INPUT,
  EMAIL_ERROR,
  PASSWORD_INPUT,
  PASSWORD_ERROR,
  FIRSTNAME_INPUT,
  FIRSTNAME_ERROR,
  LASTNAME_INPUT,
  LASTNAME_ERROR,
  MOBILEPHONE_INPUT,
  MOBILEPHONE_ERROR,
  DATEOFBIRTH_INPUT,
  DATEOFBIRTH_ERROR,
  ADDRESS_INPUT,
  ADDRESS_ERROR,
  JOIN_BUTTON,
  CREATEACCOUNT_BUTTON,
  ACCOUNTHEADING,
  MESSAGE_TEXT,
} from "../fixtures/createAccount.json";

class CreateAccount {
  static checkEmailFieldVisibility() {
    cy.get(EMAIL_INPUT).should("be.visible");
    cy.logToReport(`Email field is visible`);
    cy.get(JOIN_BUTTON).should("be.visible");
    cy.logToReport(`Join button is visible`);
  }

  static checkEmailErrorMessage(email_error_message) {
    cy.get(EMAIL_ERROR).should("be.visible").contains(email_error_message);
    cy.logToReport(`Email error message is "${email_error_message}"`);
  }

  static checkPasswordErrorMessage(password_error_message) {
    cy.get(PASSWORD_ERROR)
      .should("be.visible")
      .contains(password_error_message);
    cy.logToReport(`Password error message is "${password_error_message}"`);
  }
  static checkOtherFieldsInvisibility() {
    cy.get(PASSWORD_INPUT).should("not.exist");
    cy.logToReport(`Password field is not shown`);

    cy.get(FIRSTNAME_INPUT).should("not.exist");
    cy.logToReport(`First Name field is not shown`);

    cy.get(LASTNAME_INPUT).should("not.exist");
    cy.logToReport(`Last Name field is not shown`);
    cy.get(MOBILEPHONE_INPUT).should("not.exist");
    cy.logToReport(`Mobile Phone field is not shown`);
    cy.get(DATEOFBIRTH_INPUT).should("not.exist");
    cy.logToReport(`Date of Birth field is not shown`);
    cy.get(ADDRESS_INPUT).should("not.exist");
    cy.logToReport(`Address field is not shown`);
  }

  static checkOtherFieldsVisibility() {
    cy.get(PASSWORD_INPUT).should("be.visible").matchImage();
    cy.get(FIRSTNAME_INPUT).should("be.visible").matchImage();
    cy.get(LASTNAME_INPUT).should("be.visible").matchImage();
    cy.get(MOBILEPHONE_INPUT).should("be.visible").matchImage();
    cy.get(DATEOFBIRTH_INPUT).should("be.visible").matchImage();
    cy.get(ADDRESS_INPUT).should("be.visible").matchImage();
  }

  static fillEmail(email) {
    if (email === "") {
      cy.get(EMAIL_INPUT).should("be.visible").clear();
      cy.logToReport(`Email field is filled with blank`);
    } else {
      cy.get(EMAIL_INPUT).should("be.visible").type(email);
      cy.logToReport(`Email field is filled with "${email}"`);
    }
  }

  static fillPassword(password) {
    if (password === "") {
      cy.get(PASSWORD_INPUT).should("be.visible").clear();
      cy.logToReport(`Password field is filled with blank`);
    } else {
      cy.get(PASSWORD_INPUT).should("be.visible").type(password);
      cy.logToReport(`Password field is filled with "${password}"`);
    }
  }

  static checkErrorMessages(field, expectedErrorMessage) {
    switch (field) {
      case "FirstName":
        cy.get(FIRSTNAME_ERROR)
          .invoke("text")
          .then((actualErrorMessage) => {
            if (actualErrorMessage.includes(expectedErrorMessage)) {
              cy.log("The error message is correct.");
            } else {
              cy.log(
                `Reason of failure: The object FIRSTNAME_ERROR exists but contains a different message.`
              );
              cy.log(`Actual message: ${actualErrorMessage}`);
              cy.log(`Expected message: ${expectedErrorMessage}`);
              throw new Error(
                `Actual message: ${actualErrorMessage}, Expected message: ${expectedErrorMessage}`
              );
            }
          });
        break;
      case "LastName":
        cy.get(LASTNAME_ERROR).and("contain.text", expectedErrorMessage);
        cy.task(
          "log",
          `Last Name error message is showed with "${expectedErrorMessage}"`
        );

        break;
      case "MobilePhone":
        cy.get(MOBILEPHONE_ERROR).and("contain.text", expectedErrorMessage);
        cy.task(
          "log",
          `Mobile Phone error message is showed with "${expectedErrorMessage}"`
        );

        break;
      case "DateOfBirth":
        cy.get(DATEOFBIRTH_ERROR).and("contain.text", expectedErrorMessage);
        cy.task(
          "log",
          `Date of Birth error message is showed with "${expectedErrorMessage}"`
        );

        break;
      case "Address":
        cy.get(ADDRESS_ERROR).and("contain.text", expectedErrorMessage);
        cy.task(
          "log",
          `Address error message is showed with "${expectedErrorMessage}"`
        );

        break;
      // Add cases for other fields if needed
      default:
        break;
    }
  }
  static fillFirstName(firstName) {
    if (firstName === "") {
      cy.get(FIRSTNAME_INPUT).should("be.visible").clear(); // Clear if empty
      cy.logToReport(`First Name field is filled with blank`);
    } else {
      cy.get(FIRSTNAME_INPUT).should("be.visible").type(firstName); // Type if not empty
      cy.get(FIRSTNAME_INPUT).invoke("val").should("include", firstName);
      cy.logToReport(`First Name field is filled with "${firstName}"`);
    }
  }

  static fillLastName(lastName) {
    if (lastName === "") {
      cy.get(LASTNAME_INPUT).should("be.visible").clear(); // Clear if empty
      cy.logToReport(`Last Name field is filled with blank`);
    } else {
      cy.get(LASTNAME_INPUT).should("be.visible").type(lastName); // Type if not empty
      cy.get(LASTNAME_INPUT).invoke("val").should("include", lastName);
      cy.logToReport(`Last Name field is filled with "${lastName}"`);
    }
  }

  static fillMobilePhone(mobilePhone) {
    if (mobilePhone === "") {
      cy.get(MOBILEPHONE_INPUT).should("be.visible").clear();
      cy.logToReport(`Mobile Phone field is filled with blank`);
    } else {
      cy.get(MOBILEPHONE_INPUT).should("be.visible").type(mobilePhone);
      cy.get(MOBILEPHONE_INPUT).invoke("val").should("include", mobilePhone);
      cy.logToReport(`Mobile Phone field is filled with "${mobilePhone}"`);
    }
  }

  static fillDateOfBirth(dateOfBirth) {
    if (dateOfBirth === "") {
      cy.get(DATEOFBIRTH_INPUT).should("be.visible").clear();
      cy.logToReport(`Date of birth field is filled with blank`);
    } else {
      cy.get(DATEOFBIRTH_INPUT).should("be.visible").type(dateOfBirth);
      cy.get(DATEOFBIRTH_INPUT)
        .invoke("val")
        .should(
          "eq",
          dateOfBirth.slice(0, 2) +
            "/" +
            dateOfBirth.slice(2, 4) +
            "/" +
            dateOfBirth.slice(4)
        );
      cy.logToReport(
        `Date of birth field is filled with "` +
          dateOfBirth.slice(0, 2) +
          "/" +
          dateOfBirth.slice(2, 4) +
          "/" +
          dateOfBirth.slice(4) +
          `"`
      );
    }
  }

  static fillAddress(address) {
    if (address === "") {
      cy.get(ADDRESS_INPUT).should("be.visible").clear();
      cy.logToReport(`Address field is filled with blank`);
    } else {
      cy.get(ADDRESS_INPUT).should("be.visible").type(address);
      cy.get("ul.MuiList-root.MuiList-padding")
        .should("exist")
        .then(() => {
          cy.get("ul.MuiList-root.MuiList-padding div:first").click();
        });
      cy.get(ADDRESS_INPUT)
        .invoke("val")
        .should("include", "78 McPhersons Road");
      cy.get(CREATEACCOUNT_BUTTON).scrollIntoView();
      cy.logToReport(`Address field is filled with "${address}"`);
    }
  }

  static clickJoinButton() {
    cy.get(JOIN_BUTTON).click();
    cy.logToReport(`Clicked joined button`);
  }

  static clickCreateAccountButton() {
    cy.get(CREATEACCOUNT_BUTTON).should("be.visible").click();
    cy.logToReport(`Clicked create account button`);
  }

  static verifyCurrentAccountURL() {
    cy.get(CREATEACCOUNT_BUTTON).scrollIntoView();
    cy.url({ timeout: 30000 }).should("include", "account");
    cy.logToReport(`Account page opened`);
    cy.logToReport(`New account created`);
  }

  static verifyAccountHeadingMessage(account_heading_message) {
    cy.get(ACCOUNTHEADING)
      .should("be.visible")
      .contains(account_heading_message);
  }
}

export default CreateAccount;
