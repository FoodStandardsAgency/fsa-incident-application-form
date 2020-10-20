module.exports = {
  getSelectedOriginCountryFromSession: (session, productId) => {
    return (
      (session &&
        session.products &&
        session.products[productId] &&
        session.products[productId].originCountry &&
        session.products[productId].originCountry.value) ||
      0
    );
  },
};
