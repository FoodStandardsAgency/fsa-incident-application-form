module.exports = () => {
  return cy.request({
    url: `${Cypress.config('testHook-url')}/sims-lookups/flush`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => {
    return resp.body;
  });
}
