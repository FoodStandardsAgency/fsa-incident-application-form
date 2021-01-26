const formSubmitChoices = require("./form-submit-choices");

describe(`lib/form-submit-choices`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("formSubmitChoices", () => {
    it("should have the expected defined constant", () => {
      expect(formSubmitChoices.NEXT).toEqual("next");
      expect(formSubmitChoices.PREVIOUS).toEqual("previous");
    });
  });
});
