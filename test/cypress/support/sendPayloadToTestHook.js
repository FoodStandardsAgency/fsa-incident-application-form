module.exports = (payload) => {
  return cy.request({
    url: `${Cypress.config('testHook-url')}/incident-payload`,
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => {
    expect(resp.status).to.equal(200);
    return resp.body;
  });
}
