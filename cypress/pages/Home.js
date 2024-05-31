import { HEADER_ACCOUNT } from "../fixtures/home.json";

class Home {
  //visit the page
  static visit() {
    cy.visit("/");
  }

  static visitJoinPage() {
    cy.get(HEADER_ACCOUNT).should("be.visible").click();
    cy.contains("span", "Join").click();
    cy.intercept("GET", "https://st.dynamicyield.com/spa/*");
    cy.intercept("GET", "https://st.dynamicyield.com/spa/*").as("load");
    cy.wait("@load", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 200);
    //TODO: should develop check for Already member text and link click later when have time.
  }
}
export default Home;
