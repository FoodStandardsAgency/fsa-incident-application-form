module.exports = {
  getProductCompaniesFromSession: (session, productId) => {
    return (
      (session &&
        session.products &&
        session.products[productId] &&
        session.products[productId].companies) ||
      {}
    );
  },
};
