describe("Register", () => {
    it("should register ", () => {
        // Visit the register page
        cy.visit("http://localhost:3000/auth/register");
        // Fill in login form
        cy.get('input[name="name"]').type("E2ETest");
        cy.get('input[name="email"]').type("test@gmail.com");
        cy.get('input[name="birth_date"]').type("1990-01-01");
        cy.get('input[name="password"]').type("Test123456");
        cy.get('input[name="confirmPassword"]').type("Test123456");
        // Submit the form
        cy.get('button[type="submit"]').click();
    });
});