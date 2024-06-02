import { HEADER_ACCOUNT, JOIN_HINT } from "../fixtures/home.json";

class Home {
  //visit the page
  static visit() {
    cy.visit("/").log();
    cy.logPass(`Home page opened`);
  }

  static visitJoinPage() {
    cy.get(HEADER_ACCOUNT).should("be.visible").click();
    cy.contains("span", "Join").click();
    cy.get(JOIN_HINT).should("be.visible");
    cy.logPass(`Join page displayed`);
  }
}
export default Home;
