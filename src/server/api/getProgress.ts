import { CODLES } from "codle/codle/getRandomCodle";
import { privateProcedure } from "codle/server/api/trpc";
import { type Language } from "codle/types/Language";

export const getProgress = privateProcedure.query(
  async ({ ctx: { prisma, userId } }) => {
    const games = await prisma.game.findMany({
      where: { playerId: userId },
      include: { guesses: true },
    });

    const gamesPlayedByLanguage = Object.entries(CODLES).reduce(
      (acc, [language, codles]) => {
        acc[language as Language] = {
          played: 0,
          solved: 0,
          total: codles.length,
        };
        return acc;
      },
      {} as Record<Language, { played: number; solved: number; total: number }>
    );

    for (const game of games) {
      const isSolved = game.guesses.some(
        ({ letters }) => letters === game.codle
      );
      if (isSolved) {
        gamesPlayedByLanguage[game.language as Language].solved += 1;
      }

      const isFull = game.guesses.every(
        ({ letters }) => letters.length === game.codle.length
      );
      const isFinished = isSolved || isFull;
      if (isFinished) {
        gamesPlayedByLanguage[game.language as Language].played += 1;
      }
    }

    return {
      gamesPlayedByLanguage,
    };
  }
);
