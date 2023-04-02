import { type Guess } from "@prisma/client";
import { type ClientGuess } from "codle/types/ClientGuess";
import { NUMBER_OF_TRIES } from "codle/constants";

export function getClientGuesses(gameGuesses: Guess[]) {
  const nextGuesses: ClientGuess[] = [];
  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    const nextGuess = gameGuesses[i];
    if (nextGuess) {
      nextGuesses.push({ id: nextGuess.id, letters: nextGuess.letters });
    } else {
      nextGuesses.push({ letters: "" });
    }
  }
  return nextGuesses;
}
