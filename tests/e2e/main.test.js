it("let's try", () => {
    cy.visit("http://localhost:8080/");
    cy.get("h1").contains("Hello World");
});
