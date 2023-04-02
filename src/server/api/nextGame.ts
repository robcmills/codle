import { type PrismaClient } from "@prisma/client";
import { getRandomCodle } from "codle/codle/getRandomCodle";
import { NUMBER_OF_TRIES } from "codle/constants";
import { type Language } from "codle/types/Language";

/**
 * Get the most recent unsolved and unfinished game for the current user.
 * If none exist, create a new game.
 **/
export const nextGame = async ({
  prisma,
  playerId,
  language,
}: {
  prisma: PrismaClient;
  playerId: string;
  language: Language;
}) => {
  const games = await prisma.game.findMany({
    where: { language, playerId },
    orderBy: { updatedAt: "desc" },
    include: { guesses: true },
  });
  const existingGame = games.find(
    (game) =>
      game.guesses.length === 0 ||
      (game.guesses.every((guess) => guess.letters !== game.codle) &&
        game.guesses.some((guess) => guess.letters.length < game.codle.length))
  );
  if (existingGame) return existingGame;

  // Ensure chosen codle has not been used before
  const usedCodles = games.map((game) => game.codle);
  const codle = getRandomCodle({ language, exclude: usedCodles });
  const newGame = await prisma.game.create({
    data: {
      codle,
      language,
      playerId,
    },
  });

  const newGuesses = [];
  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    newGuesses.push({ letters: "", gameId: newGame.id, playerId });
  }
  await prisma.guess.createMany({
    data: newGuesses,
  });

  return await prisma.game.findFirstOrThrow({
    where: { id: newGame.id, playerId },
    include: { guesses: true },
  });
};
