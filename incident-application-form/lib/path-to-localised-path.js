module.exports = {
  localisePath: (path, locale = "en") => {
    if (!locale || locale === "en" || locale !== "cy") {
      return path;
    }

    if (path === "/") {
      return `/${locale}`;
    }

    return `/${locale}${path}`;
  },
};
