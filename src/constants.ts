export const NUMBER_OF_TRIES = 5; // DANGER: DO NOT CHANGE THIS VALUE
export const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .reduce((acc, char) => {
    acc.add(char);
    return acc;
  }, new Set<string>());
