import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { getRandomCodle } from "codle/codle/getRandomCodle";
import { NUMBER_OF_TRIES } from "codle/constants";
import { type Language } from "codle/types/Language";

/**
 * Get the most recent unsolved and unfinished game for the current user.
 * If none exist, create a new game.
 * If not able to create a new game, throw an error. This signifies that
 * the user has already played all the available codles for the selected
 * language.
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
  if (codle === null) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "All Codles for the given language have been played.",
    });
  }

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
