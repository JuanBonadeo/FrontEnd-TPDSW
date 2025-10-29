describe("Login and Add Favourite Movie", () => {
    it("should login and add movie to favourites", () => {
        // Visit the login page
        cy.visit("http://localhost:3000/auth/login");
        
        // Fill in login form
        cy.get('input[name="email"]').type("test@gmail.com");
        cy.get('input[name="password"]').type("Test123456");
        
        // Submit the form
        cy.get('button[type="submit"]').click();

        // Esperar a que redirija después del login
        cy.url().should('not.include', '/auth/login');

        // Visitar la página de la película
        cy.visit("http://localhost:3000/movies/54");

        // Buscar el botón y hacer click
        cy.get('#add-favourite',).should('exist').click();

        // Ir al perfil para verificar
        cy.visit("http://localhost:3000/profile");
    });
});
