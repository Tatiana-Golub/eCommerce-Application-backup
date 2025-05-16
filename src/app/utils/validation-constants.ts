export const emailRules = {
  format: /^[^@]+@[^@]+\.[^@]+$/,
  noWhitespace: /^\S*\S$/,
  hasAt: /@/,
  hasDomain: /@.+\./,
};

export const passwordRules = {
  minLength: /^.{8,}$/,
  upperCase: /[A-Z]/,
  lowerCase: /[a-z]/,
  digit: /\d/,
  specialChar: /[!@#$%^&*]/,
  noWhitespace: /^\S*\S$/,
};

export const nameRules = {
  onlyLetters: /^[A-Za-z]+$/,
};
