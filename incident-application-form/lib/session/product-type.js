module.exports = {
  getSelectedProductTypeFromSession: (session, productId) => {
    return (
      (session &&
        session.products &&
        session.products[productId] &&
        session.products[productId].productType &&
        session.products[productId].productType.value) ||
      0
    );
  },
};
