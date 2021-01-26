module.exports = (input) => {
  const toCheck = Array.isArray(input) ? input : [input];

  return toCheck
    .filter((field) => field !== undefined)
    .every((field) => field === "");
};
