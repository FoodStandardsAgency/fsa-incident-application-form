module.exports = () => {
  return cy.request({
    url: `${Cypress.config('testHook-url')}/incident-payload/flush`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => {
    return resp.body;
  });
}
