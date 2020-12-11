const SIMS_LOOKUP_DATA = require('../fixtures/sample-dropdown-data.json');
const A_PAYLOAD = {
  id:'123',
  field1:'456',
  field2:'789',
};

context('throwaway example of how to get data out of our test-hook', () => {

  beforeEach(() => {
    // catches, logs and ignores any load-errors on the page..
    // can probably delete this but worth including in 1st template in case we need it..
    cy.on('uncaught:exception', (err, runnable) => { console.log(err.stack); return false; });

    // if we don't have a mechanism like this it becomes painfull to
    //  repeatedly re-run tests locally
    cy.flushPayloads();
    cy.flushSimsLookups();
  });

  it(`post some things to a test hook and get them back again...`, () => {
    // not something we particularly want to do in cypress tests, but it lets me prove the other 2 hooks..
    cy.sendPayloadToTestHook(A_PAYLOAD);

    // get a list of all the things that have been posted to our test-hook since we last flushed
    cy.listPayloadsReceived().then( (payloads) => {
      expect(payloads).to.deep.equal([A_PAYLOAD]);
    });

    // look for a specific one by id. 'id' might not be the right field name, but proves the point
    cy.receivedPayloadById(A_PAYLOAD.id).then( (payload) => {
      expect(payload).to.deep.equal(A_PAYLOAD);
    });

  });

  it(`post some lookups and get them back again...`, () => {
    // give it some lookup data
    cy.setupSimsLookups(SIMS_LOOKUP_DATA);

    // when the app hits that endpoint it gets back the lookup data we gave it
    cy.getSimsLookups().then( (lookups) => {
      expect(lookups).to.deep.equal(SIMS_LOOKUP_DATA);
    });

  });

});
