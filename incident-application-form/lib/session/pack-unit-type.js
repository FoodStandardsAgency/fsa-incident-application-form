module.exports = {
  getSelectedPackUnitTypeFromSession: (session, productId) => {
    return (
      (session &&
        session.products &&
        session.products[productId] &&
        session.products[productId].packUnitType &&
        session.products[productId].packUnitType.value) ||
      0
    );
  },
};
