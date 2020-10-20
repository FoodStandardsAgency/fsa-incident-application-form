module.exports = {
  getSelectedUnitTypeFromSession: (session, productId) => {
    return (
      (session &&
        session.products &&
        session.products[productId] &&
        session.products[productId].unitType &&
        session.products[productId].unitType.value) ||
      0
    );
  },
};
