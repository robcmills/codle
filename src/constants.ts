export const NUMBER_OF_TRIES = 5;
export const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .reduce((acc, char) => {
    acc.add(char);
    return acc;
  }, new Set<string>());
