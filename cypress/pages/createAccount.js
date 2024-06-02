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
  SHOP_BUTTON,
} from "../fixtures/createAccount.json";

class CreateAccount {
  static checkEmailFieldVisibility() {
    cy.get(EMAIL_INPUT).should("be.visible");
    cy.logPass(`Email field is visible`);
    cy.get(JOIN_BUTTON).should("be.visible");
    cy.logPass(`Join button is visible`);
  }

  static checkEmailErrorMessage(email_error_message) {
    cy.get(EMAIL_ERROR).should("be.visible").contains(email_error_message);
    cy.logPass(`Email error message is "${email_error_message}"`);
  }

  static checkPasswordErrorMessage(password_error_message) {
    cy.get(PASSWORD_ERROR)
      .should("be.visible")
      .contains(password_error_message);
    cy.logPass(`Password error message is "${password_error_message}"`);
  }
  static checkOtherFieldsInvisibility() {
    cy.get(PASSWORD_INPUT).should("not.exist");
    cy.logPass(`Password field is not shown`);

    cy.get(FIRSTNAME_INPUT).should("not.exist");
    cy.logPass(`First Name field is not shown`);

    cy.get(LASTNAME_INPUT).should("not.exist");
    cy.logPass(`Last Name field is not shown`);
    cy.get(MOBILEPHONE_INPUT).should("not.exist");
    cy.logPass(`Mobile Phone field is not shown`);
    cy.get(DATEOFBIRTH_INPUT).should("not.exist");
    cy.logPass(`Date of Birth field is not shown`);
    cy.get(ADDRESS_INPUT).should("not.exist");
    cy.logPass(`Address field is not shown`);
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
      cy.logPass(`Email is filled with blank`);
    } else {
      cy.get(EMAIL_INPUT).should("be.visible").type(email);
      cy.logPass(`Email is filled with "${email}"`);
    }
  }

  static fillPassword(password) {
    if (password === "") {
      cy.get(PASSWORD_INPUT).should("be.visible").clear();
      cy.logPass(`Password is filled with blank`);
    } else {
      cy.get(PASSWORD_INPUT).should("be.visible").type(password);
      cy.logPass(`Password is filled with "${password}"`);
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
          `Last Name error message is shown with "${expectedErrorMessage}"`
        );

        break;
      case "MobilePhone":
        cy.get(MOBILEPHONE_ERROR).and("contain.text", expectedErrorMessage);
        cy.task(
          "log",
          `Mobile Phone error message is shown with "${expectedErrorMessage}"`
        );

        break;
      case "DateOfBirth":
        cy.get(DATEOFBIRTH_ERROR).and("contain.text", expectedErrorMessage);
        cy.task(
          "log",
          `Date of Birth error message is shown with "${expectedErrorMessage}"`
        );

        break;
      case "Address":
        cy.get(ADDRESS_ERROR).and("contain.text", expectedErrorMessage);
        cy.task(
          "log",
          `Address error message is shown with "${expectedErrorMessage}"`
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
      cy.logPass(`First Name is filled with blank`);
    } else {
      cy.get(FIRSTNAME_INPUT).should("be.visible").type(firstName); // Type if not empty
      cy.get(FIRSTNAME_INPUT).invoke("val").should("include", firstName);
      cy.logPass(`First Name is filled with "${firstName}"`);
    }
  }

  static fillLastName(lastName) {
    if (lastName === "") {
      cy.get(LASTNAME_INPUT).should("be.visible").clear(); // Clear if empty
      cy.logPass(`Last Name is filled with blank`);
    } else {
      cy.get(LASTNAME_INPUT).should("be.visible").type(lastName); // Type if not empty
      cy.get(LASTNAME_INPUT).invoke("val").should("include", lastName);
      cy.logPass(`Last Name is filled with "${lastName}"`);
    }
  }

  static fillMobilePhone(mobilePhone) {
    if (mobilePhone === "") {
      cy.get(MOBILEPHONE_INPUT).should("be.visible").clear();
      cy.logPass(`Mobile Phone is filled with blank`);
    } else {
      cy.get(MOBILEPHONE_INPUT).should("be.visible").type(mobilePhone);
      cy.get(MOBILEPHONE_INPUT).invoke("val").should("include", mobilePhone);
      cy.logPass(`Mobile Phone is filled with "${mobilePhone}"`);
    }
  }

  static fillDateOfBirth(dateOfBirth) {
    if (dateOfBirth === "") {
      cy.get(DATEOFBIRTH_INPUT).should("be.visible").clear();
      cy.logPass(`Date of birth is filled with blank`);
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
      cy.logPass(
        `Date of birth is filled with "` +
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
      cy.logPass(`Address is filled with blank`);
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
      cy.logPass(`Address is filled with "${address}"`);
    }
  }

  static clickJoinButton() {
    cy.get(JOIN_BUTTON).click();
    cy.logPass(`Join button clicked`);
  }

  static clickCreateAccountButton() {
    cy.get(CREATEACCOUNT_BUTTON).should("be.visible").click();
    cy.logPass(`Create account button clicked`);
    cy.screenshot({ clip: { x: 20, y: 20, width: 500, height: 1500 } });
  }

  static verifyCurrentAccountURL() {
    cy.get(SHOP_BUTTON);
    cy.url({ timeout: 30000 }).should("include", "account");
    cy.logPass(`Account page opened`);
    cy.logPass(`New account created`);
  }

  static verifyAccountHeadingMessage(account_heading_message) {
    cy.get(ACCOUNTHEADING)
      .should("be.visible")
      .contains(account_heading_message);
  }
}

export default CreateAccount;
