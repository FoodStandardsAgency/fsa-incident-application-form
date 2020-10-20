module.exports = {
  getSelectedNotifierTypeFromSession: (session) => {
    return (
      (session &&
        session.yourDetails &&
        session.yourDetails.notifierType &&
        session.yourDetails.notifierType.value) ||
      0
    );
  },
};
