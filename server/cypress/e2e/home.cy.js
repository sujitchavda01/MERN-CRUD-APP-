describe('Login Spec', () => {
  it('should load the application', () => {
    cy.request({
      url: 'http://localhost:5173/',
      failOnStatusCode: false, // Prevents Cypress from failing immediately if the server is down
    }).then((response) => {
      if (response.status === 200) {
        cy.visit('http://localhost:5173/');
      } else {
        throw new Error('Frontend server is not running on port 5173');
      }
    });
  });
});

describe('Register Spec', () => {
  it('should load the application', () => {
    cy.request({
      url: 'http://localhost:5173/register',
      failOnStatusCode: false, // Prevents Cypress from failing immediately if the server is down
    }).then((response) => {
      if (response.status === 200) {
        cy.visit('http://localhost:5173/register');
      } else {
        throw new Error('Frontend server is not running on port 5173');
      }
    });
  });
});

describe("User API Test",()=>{
  const apiUrl="http://localhost:8000/api";
  let token="";
  let userId="";
  if("Should register a new user",()={
    cy.request("POST",`${apiUrl}/register`,{
      fname:"",
      lname:"",
      email:"",
      password:"",
    })
  })
});