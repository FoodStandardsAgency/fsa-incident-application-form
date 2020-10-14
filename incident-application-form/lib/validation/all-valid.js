module.exports = {
  allValid: (validated) => {
    // an array of validated objects
    return (
      validated
        // each validated object has the format { validatedName: { isValid: bool, ... other stuff }
        .every((validated) =>
          // we don't know the `validatedName` ahead of time, so get any keys within the validated object
          // probably only ever one, e.g. { contactName: { isValid: true, ... } }
          // and check that every validated object is valid, e.g. contactName.isValid
          Object.keys(validated).every((key) => validated[key].isValid)
        )
    );
  },
};
