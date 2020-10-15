const nunjucks = require("nunjucks");

module.exports = {
  formatProducts: (products, i18n, routes) => {
    const formattedProducts = [];

    for (const productId of Object.keys(products)) {
      formattedProducts.push([
        {
          text: products[productId].productName.value,
        },
        {
          html: nunjucks.render(
            `${__dirname}/../../views/partials/details-of-products-actions.njk`,
            {
              id: productId,
              i18n,
              routes,
            }
          ),
        },
      ]);
    }

    return formattedProducts;
  },
};
