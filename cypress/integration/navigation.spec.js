describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("finds the list item, clicks it and checks it for the correct background colour", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});