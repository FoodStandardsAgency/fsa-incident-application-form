module.exports = (id) => {
  return cy.request({
    url: `${Cypress.config('testHook-url')}/incident-payload/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => {
    return resp.body;
  });
}
