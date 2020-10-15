const nunjucks = require("nunjucks");

module.exports = {
  formatCompanies: (companies, productId, i18n, routes) => {
    const formattedCompanies = [];

    for (const companyId of Object.keys(companies)) {
      formattedCompanies.push([
        {
          text: companies[companyId].companyName.value,
        },
        {
          html: nunjucks.render(
            `${__dirname}/../../views/partials/details-of-companies-actions.njk`,
            {
              companyId,
              i18n,
              productId,
              routes,
            }
          ),
        },
      ]);
    }

    return formattedCompanies;
  },
};
