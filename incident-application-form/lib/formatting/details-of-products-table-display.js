const nunjucks = require("nunjucks");

module.exports = {
  formatProducts: (products, i18n, routes) => {
    const formattedProducts = [];
    // garbage workaround for not having access to the index in for / of
    let i = 0;

    for (const productId of Object.keys(products)) {
      formattedProducts.push([
        {
          text: products[productId].productName.value,
          attributes: {
            "data-cy": `product-name-${i}`,
          },
        },
        {
          html: nunjucks.render(
            `${__dirname}/../../views/partials/details-of-products-actions.njk`,
            {
              id: productId,
              i18n,
              routes,
              index: i,
            }
          ),
        },
      ]);

      i += 1;
    }

    return formattedProducts;
  },
};
