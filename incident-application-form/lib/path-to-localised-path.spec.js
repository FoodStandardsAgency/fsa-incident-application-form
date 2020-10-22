const { localisePath } = require("./path-to-localised-path");

describe(`lib/path-to-localised-path`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("localiseUrl", () => {
    const testCases = [
      ["no change - root", { locale: "en", path: "/" }, "/"],
      ["no change - one level", { locale: "en", path: "/a" }, "/a"],
      ["no change - two levels", { locale: "en", path: "/a/b" }, "/a/b"],
      ["no change - three levels", { locale: "en", path: "/a/b/c" }, "/a/b/c"],
      ["change - root", { locale: "cy", path: "/" }, "/cy"],
      ["change - one level", { locale: "cy", path: "/a" }, "/cy/a"],
      ["change - two levels", { locale: "cy", path: "/a/b" }, "/cy/a/b"],
      ["change - three levels", { locale: "cy", path: "/a/b/c" }, "/cy/a/b/c"],
    ];

    test.each(testCases)(`%s`, (description, { locale, path }, expected) => {
      expect(localisePath(path, locale)).toEqual(expected);
    });
  });
});
