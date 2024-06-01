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
const moment = require("moment");

class CreateAccount {
  static checkEmailFieldVisibility() {
    cy.get(EMAIL_INPUT).should("be.visible");
    cy.get(JOIN_BUTTON).should("be.visible");
    cy.logToReport("New account created");
  }

  static checkEmailErrorMessage(email_error_message) {
    cy.get(EMAIL_ERROR).should("be.visible").contains(email_error_message);
  }

  static checkPasswordErrorMessage(password_error_message) {
    cy.get(PASSWORD_ERROR)
      .should("be.visible")
      .contains(password_error_message);
  }
  static checkOtherFieldsInvisibility() {
    cy.get(PASSWORD_INPUT).should("not.exist");
    cy.get(FIRSTNAME_INPUT).should("not.exist");
    cy.get(LASTNAME_INPUT).should("not.exist");
    cy.get(MOBILEPHONE_INPUT).should("not.exist");
    cy.get(DATEOFBIRTH_INPUT).should("not.exist");
    cy.get(ADDRESS_INPUT).should("not.exist");
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
    cy.get(EMAIL_INPUT).should("be.visible").clear();
    if (email !== "") {
      cy.get(EMAIL_INPUT).should("be.visible").type(email);
    }
  }

  static fillPassword(password) {
    cy.get(PASSWORD_INPUT).should("be.visible").clear();
    cy.get(PASSWORD_INPUT).should("be.visible").type(password);
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
        break;
      case "MobilePhone":
        cy.get(MOBILEPHONE_ERROR).and("contain.text", expectedErrorMessage);
        break;
      case "DateOfBirth":
        cy.get(DATEOFBIRTH_ERROR).and("contain.text", expectedErrorMessage);
        break;
      case "Address":
        cy.get(ADDRESS_ERROR).and("contain.text", expectedErrorMessage);
        break;
      // Add cases for other fields if needed
      default:
        break;
    }
  }
  static fillFirstName(firstName) {
    if (firstName === "") {
      cy.get(FIRSTNAME_INPUT).should("be.visible").clear(); // Clear if empty
    } else {
      cy.get(FIRSTNAME_INPUT).should("be.visible").type(firstName); // Type if not empty
      cy.get(FIRSTNAME_INPUT).invoke("val").should("include", firstName);
    }
  }

  static fillLastName(lastName) {
    if (lastName === "") {
      cy.get(LASTNAME_INPUT).should("be.visible").clear(); // Clear if empty
    } else {
      cy.get(LASTNAME_INPUT).should("be.visible").type(lastName); // Type if not empty
      cy.get(LASTNAME_INPUT).invoke("val").should("include", lastName);
    }
  }

  static fillMobilePhone(mobilePhone) {
    if (mobilePhone === "") {
      cy.get(MOBILEPHONE_INPUT).should("be.visible").clear();
    } else {
      cy.get(MOBILEPHONE_INPUT).should("be.visible").type(mobilePhone);
      cy.get(MOBILEPHONE_INPUT).invoke("val").should("include", mobilePhone);
    }
  }

  static fillDateOfBirth(dateOfBirth) {
    if (dateOfBirth === "") {
      cy.get(DATEOFBIRTH_INPUT).should("be.visible").clear();
    } else {
      cy.get(DATEOFBIRTH_INPUT).should("be.visible").type(dateOfBirth);
      cy.get(DATEOFBIRTH_INPUT)
        .invoke("val")
        .should("eq", moment(dateOfBirth, "DDMMYYYY").format("DD/MM/YYYY"));
    }
  }

  static fillAddress(address) {
    if (address === "") {
      cy.get(ADDRESS_INPUT).should("be.visible").clear();
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
    }
  }

  static clickJoinButton() {
    cy.get(JOIN_BUTTON).click();
  }

  static clickCreateAccountButton() {
    cy.get(CREATEACCOUNT_BUTTON).should("be.visible").click();
  }

  static verifyCurrentAccountURL() {
    cy.get(CREATEACCOUNT_BUTTON).scrollIntoView();
    cy.get(MESSAGE_TEXT).scrollIntoView();
    cy.url().should("include", "account");
    cy.task("log", `      New account created`);
  }

  static verifyAccountHeadingMessage(account_heading_message) {
    cy.get(ACCOUNTHEADING)
      .should("be.visible")
      .contains(account_heading_message);
  }
}

export default CreateAccount;
