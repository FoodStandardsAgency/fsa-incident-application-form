module.exports = {
  getSelectedAddressCountryFromSession: (session) => {
    return (
      (session &&
        session.yourDetails &&
        session.yourDetails.address &&
        session.yourDetails.address.country &&
        session.yourDetails.address.country.value) ||
      0
    );
  },
};
