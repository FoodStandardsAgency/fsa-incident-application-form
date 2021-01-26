const nunjucks = require("nunjucks");

module.exports = {
  formatCompanies: (companies, productId, i18n, routes) => {
    const formattedCompanies = [];
    // garbage workaround for not having access to the index in for / of
    let i = 0;

    for (const companyId of Object.keys(companies)) {
      formattedCompanies.push([
        {
          text: companies[companyId].companyName.value,
          attributes: {
            "data-cy": `company-name-${i}`,
          },
        },
        {
          html: nunjucks.render(
            `${__dirname}/../../views/partials/details-of-companies-actions.njk`,
            {
              companyId,
              i18n,
              productId,
              routes,
              index: i,
            }
          ),
        },
      ]);

      i += 1;
    }

    return formattedCompanies;
  },
};
