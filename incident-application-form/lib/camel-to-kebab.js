/**
 * I hate this. The reasoning is for creating links to specific errors in a form when using the form error summary gov uk component.
 *
 * To make this work properly, I need to pass in the field name from the field that is being validated.
 *
 * This is therefore a hack, and needs a proper refactor.
 *
 * @type {{camelToKebab: (function(*): string)}}
 */
module.exports = {
  camelToKebab: (str) =>
    str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase(),
};
