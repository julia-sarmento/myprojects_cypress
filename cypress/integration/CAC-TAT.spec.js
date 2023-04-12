/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
      })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulario ', function() {
        const longText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        cy.get('#firstName').type('Julia')
        cy.get('#lastName').type('Sarmento')
        cy.get('#email').type('j.s@exemplo.com')
        cy.get('#phone').type('999999999')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.get('.button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Julia')
        cy.get('#lastName').type('Sarmento')
        cy.get('#email').type('j.s.com')
        cy.get('#phone').type('999999999')
        cy.get('#open-text-area').type('Teste')
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    
    it('campo telefone permanece vazio caso o usuário insira caracteres de texto os invés de números', function(){
        cy.get('#phone')
            .type('abcdejklin')
            .should('have.value', '')
      
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Julia')
        cy.get('#lastName').type('Sarmento')
        cy.get('#email').type('j.s@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('.button[type="submit"]').click()
      
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName')
            .type('Julia')
            .should('have.value','Julia' )
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Sarmento')
            .should('have.value','Sarmento' )
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('j.s@exemplo.com')
            .should('have.value', 'j.s@exemplo.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('999999999')
            .should('have.value', '999999999')
            .clear()
            .should('have.value', '')

    })
    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
})