import { getRandomCodle } from "codle/codle/getRandomCodle";
import { privateProcedure } from "codle/server/api/trpc";

/**
 * Get the most recent unsolved game for the current user.
 * If none exist, create a new game.
 **/
export const getGame = privateProcedure.query(async ({ ctx }) => {
  const playerId = ctx.userId;
  const games = await ctx.prisma.game.findMany({
    where: { playerId },
    orderBy: { updatedAt: "desc" },
    include: { guesses: true },
  });
  const existingGame = games.find(
    (game) =>
      game.guesses.length === 0 ||
      game.guesses.every((guess) => guess.letters !== game.codle)
  );
  if (existingGame) return existingGame;

  const language = "JavaScript";
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
  return newGame;
});
