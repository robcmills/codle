import { z } from "zod";

import { getRandomCodle } from "codle/codle/getRandomCodle";
import { NUMBER_OF_TRIES } from "codle/constants";
import { privateProcedure } from "codle/server/api/trpc";
import { type Language } from "codle/types/Language";

/**
 * Get the most recent unsolved game for the current user.
 * If none exist, create a new game.
 **/
export const getGame = privateProcedure
  .input(
    z.object({
      language: z.string().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    const language = (input.language || "JavaScript") as Language;
    const playerId = ctx.userId;
    const games = await ctx.prisma.game.findMany({
      where: { language, playerId },
      orderBy: { updatedAt: "desc" },
      include: { guesses: true },
    });
    const existingGame = games.find(
      (game) =>
        game.guesses.length === 0 ||
        game.guesses.every((guess) => guess.letters !== game.codle)
    );
    if (existingGame) return existingGame;

    // Ensure chosen codle has not been used before
    const usedCodles = games.map((game) => game.codle);
    const codle = getRandomCodle({ language, exclude: usedCodles });
    const newGame = await ctx.prisma.game.create({
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
    await ctx.prisma.guess.createMany({
      data: newGuesses,
    });

    return newGame;
  });
